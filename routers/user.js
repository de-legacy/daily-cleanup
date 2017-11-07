const express 		= require('express');
const router 		= express.Router();
const session 		= require('express-session')
const bcrypt		= require('bcrypt');


const Model = require("../models")


// Home User

router.get('/', function(req,res) {
	Model.User.findAll().then(allUser => {
		res.render('home', {allUser : allUser })
	})
})

//CREATE USER
router.get('/add', function(req,res) {
	res.render('add')
})


router.post('/add', function(req,res) {
	Model.User.create(req.body).then(() => {
		res.redirect('/user')
	})
})

//EDIT USER
router.get('/edit/:id', function(req,res) {
	Model.User.findOne({
		where : {
			id : req.params.id
		}
	}).then(edited => {
		res.render('edit', {edit : edited} )
	})
})

router.post('/edit/:id', function(req,res) {
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
		res.redirect('/user')
	}).catch(err => {
		res.send(err);
	})
})

//DELETE USER

router.get('/delete/:id', function(req,res) {
	Model.User.destroy({
		where : {
			id : req.params.id
		}
	}).then(() => {
		res.redirect('/user')
	}).catch(err => {
		res.send(err);
	})
})

module.exports = router;