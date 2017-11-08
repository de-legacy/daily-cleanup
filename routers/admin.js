const express 		= require('express');
const router 		= express.Router();
const session 		= require('express-session')
const bcrypt		= require('bcrypt');


const Model = require("../models")
const checklogin = require ("../helpers/checklogin")


router.get('/', function(req,res) {
	Model.User.findAll().then(allUser => {
		res.render('admin/all-users', {allUser : allUser });
	})
})

router.get('/users', checklogin, function(req,res) {
	Model.User.findAll().then(allUser => {
		res.render('admin/all-users', {allUser : allUser});
	}).catch(err => {
		res.send(err)
	})
})

router.get('/workers', function(req,res) {
	Model.Worker.findAll().then(allWorkers => {
		res.render('admin/all-workers', {allWorkers : allWorkers });
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
		res.render('admin/add-user', {edit : edited} )
	})
})

router.post('/edit/:id', checklogin, function(req,res) {
	console.log(req.body)
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

module.exports = router;