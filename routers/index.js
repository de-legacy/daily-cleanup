const express 		= require('express');
const router 		= express.Router();
const session 		= require('express-session')
const bcrypt		= require('bcrypt');

const Model = require("../models")
const checklogin = require ("../helpers/checklogin")
const checksession = require ("../helpers/checksession")
const Helper = require("../helpers/helper");

router.get('/', (req, res) => {
	res.render('index', {loggedIn : Helper.isLoggedIn(req)});
})

router.get('/login', checksession , (req, res) => {
	res.render('login', {error: false});
})

router.get('/logout', (req, res) => {
	req.session.destroy(function(err){
			res.render('login', {message: "Logout success", error: false});
	})
})

router.post('/login', (req, res) => {
	Model.User
	 .findOne({
		where : {
			username : req.body.username
		}
	 })
	  .then(user => {
		if(user){
			bcrypt.compare(req.body.password, user.password).then(result => {
				if(result){
				  req.session.loggedIn = true
				  req.session.username = user.username
				  req.session.idUser   = user.id
				  req.session.privelege   = user.privelege
				  res.redirect('/user/list-workers')
				}else{
				  res.render('login', {error: true, message : undefined})
				}
			})
		}else{
			res.render('login', {error: true , message : undefined})
		}
	  })
})

//CREATE USER

router.get('/register', function(req,res) {
	res.render('register', {loggedIn : Helper.isLoggedIn(req)})
})


router.post('/register', function(req,res) {
	Model.User
	 .findOne({where : {
		username : req.body.username
	}})
	  .then(edit => {
		if(edit == null){
			Model.User
			 .create(req.body)
			  .then(() => {
				res.render('login', {message: 'Sukses membuat Akun', error: false})
			  })
			   .catch(err => {
			  	 console.log(err);
				 res.send(err);
			   })
		}else{
			res.render('login', {error: true , message : 'Username Already Used'})
		}
	  })
	   .catch(err => {
		 res.render('login', {error: true , message : 'Email Already Used'})
	   })
})

//TOP Worker

router.get('/top-workers', (req, res) => {
	Model.Worker
	 .findAll({
	 	order: [ ['averagerating', 'DESC']],
		where: {
			averagerating: {
				gte : 3
			}
		}
	 })
	  .then(allWorker => {
	  	 res.render('top-workers', {allWorker : allWorker, loggedIn : Helper.isLoggedIn(req)});
  	  })
  	   .catch(err => {
		  res.send(err);
	   })

})

module.exports = router;