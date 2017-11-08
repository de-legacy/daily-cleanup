const express 		= require('express');
const router 		= express.Router();
const session 		= require('express-session')
const bcrypt		= require('bcrypt');

const Model = require("../models")
const checklogin = require ("../helpers/checklogin")

router.get('/', (req, res) => {
	res.render('index');
})

router.get('/login', (req, res) => {
	res.render('login', {error: false});
})

router.get('/logout', (req, res) => {
	req.session.destroy(function(err){
			res.render('login', {message: "Logout success", error: false});
	})
})

router.post('/login', (req, res) => {
	Model.User.findOne({
		where : {
			username : req.body.username
		}
	}).then(user => {
		if(user){
			bcrypt.compare(req.body.password, user.password).then(result => {
				if(result){
					req.session.loggedIn = true
					req.session.username = user.username
					req.session.idUser   = user.id
					req.session.privelege   = user.privelege
					res.redirect('/user/list-workers')
				}else{
					res.render('login', {error: true})
				}
			})
		}else{
			res.render('login', {error: true})
		}
	})

})

//CREATE USER

router.get('/register', function(req,res) {
	res.render('register')
})


router.post('/register', function(req,res) {
	Model.User.create(req.body).then(() => {
		res.render('login', {message: 'Sukses membuat Akun', error: false})
	})
})

module.exports = router;