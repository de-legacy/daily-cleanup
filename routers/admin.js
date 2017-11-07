const express 		= require('express');
const router 		= express.Router();
const session 		= require('express-session')
const bcrypt		= require('bcrypt');


const Model = require("../models")

router.get('/', function(req,res) {
	Model.User.findAll().then(allUsers => {
		res.render('admin/all-users', {allUsers : allUsers });
	})
})

router.get('/users', function(req,res) {
	Model.User.findAll().then(allUsers => {
		res.render('admin/all-users', {allUsers : allUsers });
	})
})

router.get('/workers', function(req,res) {
	Model.Worker.findAll().then(allWorkers => {
		res.render('admin/all-workers', {allWorkers : allWorkers });
	})
})

module.exports = router;