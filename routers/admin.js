const express 		= require('express');
const router 		= express.Router();
const session 		= require('express-session')
const bcrypt		= require('bcrypt');


const Model = require("../models")
const checklogin = require ("../helpers/checklogin")


router.get('/', checklogin, function(req,res) {
	Model.User.findAll().then(allUser => {
		res.render('admin/all-users', {allUser : allUser, loggedIn: req.session.loggedIn, privelege: req.session.privelege});
	})
})

router.get('/users', checklogin, function(req,res) {
	Model.User.findAll().then(allUser => {
		res.render('admin/all-users', {allUser : allUser, loggedIn: req.session.loggedIn, privelege: req.session.privelege});
	}).catch(err => {
		res.send(err)
	})
})

router.get('/workers', checklogin, function(req,res) {
	Model.Worker.findAll().then(allWorkers => {
		res.render('admin/all-workers', {allWorkers : allWorkers, loggedIn: req.session.loggedIn, privelege: req.session.privelege });
	})
})

//DELETE USER

router.get('/delete/:id', checklogin, function(req,res) {
	Model.User.destroy({
		where : {
			id : req.params.id
		}
	}).then(() => {
		res.redirect('/admin/users')
	}).catch(err => {
		res.send(err);
	})
})

// EDIT USER ADMIN

router.get('/edit/:id', checklogin, function(req,res) {
	Model.User.findOne({
		where : {
			id : req.params.id
		}
	}).then(edited => {
		res.render('admin/add-user', {edit : edited, loggedIn: req.session.loggedIn, privelege: req.session.privelege} )
	})
})

router.post('/edit/:id', checklogin, function(req,res) {
	Model.User.update({
		fullname : req.body.fullname,
		address	 : req.body.address,
		phone	 : req.body.phone,
		email	 : req.body.email,
		username : req.body.username,
		password : req.body.password,
		privelege: req.body.privelege
	}, {
		where : {
			id : req.params.id
		}
	}).then(() => {
		res.redirect('/admin/users')
	}).catch(err => {
		res.send(err);
	})
})

// Admin Worker
router.get('/workers/add', (req, res) => {
	res.render('admin/add-worker');
})

// Add
router.post('/workers/add', (req, res) => {
	Model.Worker.create({
		fullname : req.body.fullname,
		phone: req.body.phone,
		email: req.body.email,
		averagerating: (req.body.averagerating === '') ? null : +req.body.averagerating
	}).then(success => {
		res.redirect('/admin/workers');

	}).catch(err => res.send(err.message));
})

//Edit

router.get('/workers/edit/:workerId', (req, res) => {
	Model.Worker.findById(req.params.workerId)
		.then(worker => {
			res.render('admin/add-worker', {editedWorker: worker});

		}).catch(err => res.send(err.message));
});

router.post('/workers/edit/:workerId', (req, res) => {
	Model.Worker.update(
		{
	    fullname: req.body.fullname,
	    phone: req.body.phone,
	    email: req.body.email,
	    averagerating: +req.body.averagerating
	  },
		{
			where: {
				id: req.body.WorkerId
			}
		}
	).then(success => {
		res.redirect('/admin/workers');

	}).catch(err => res.send(err.message));
})

// Delete
router.get('/workers/delete/:workerId', (req, res) => {
	Model.Worker.destroy({
		where: {
			id: req.params.workerId
		}
	}).then(success => {
		res.redirect('/admin/workers');

	}).catch(err => res.send(err.message));
})

module.exports = router;