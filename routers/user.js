const express 		= require('express');
const router 		= express.Router();
const session 		= require('express-session')
const bcrypt		= require('bcrypt');


const Model = require("../models")
const checklogin = require ("../helpers/checklogin")


// Home User

router.get('/list-workers', checklogin, (req,res) => {
	Model.Worker.findAll().then(allWorker => {
		res.render('list-workers', {allWorker : allWorker, loggedIn: req.session.loggedIn, privelege: req.session.privelege})
	})
})

router.get('/order-services/:id', checklogin, (req, res) => {
	Model.User.findOne({
		where : {
			username : req.session.username
		}
	}).then(user => {
		Model.Order.create({
			UserId : user.id,
			WorkerId : req.params.id
		}).then(() => {
			res.render('thankyou', {title: 'Terima kasih atas pesanannya', content: 'Silahkan cek pesanan anda pada link dibawah', link: user.id, loggedIn: req.session.loggedIn, privelege: req.session.privelege});
		})
	})
})


router.get('/orders', checklogin, (req,res) => {
	Model.User.findOne({
		where : {
			username : req.session.username
		}
	}).then(user => {
		res.redirect(`/user/orders/${user.id}`)
	})
	.catch(err => {
		res.send(err);
	})
})

router.get('/orders/:id', checklogin, (req, res) => {
	Model.Order.findAll({
		attributes : ['id', 'UserId', 'WorkerId', 'rating', 'message', 'createdAt', 'updatedAt', 'status'],
		include : [Model.User,Model.Worker],
		where : {
			UserId : req.params.id
		}
	}).then(userOrder => {
		res.render('list-orders', {orders : userOrder, loggedIn: req.session.loggedIn, privelege: req.session.privelege});
	})
})

router.get('/order-complete/:id', checklogin, (req, res) => {
	res.render('order-complete-form', {order : req.params.id, loggedIn: req.session.loggedIn, privelege: req.session.privelege});
})

router.post('/order-complete/:id', checklogin, (req, res) => {
	Model.Order.update({
		message: req.body.message,
		rating: req.body.rating,
		status: true
	}, { where : {
		id : req.params.id
	}}).then(() => {
		res.send("SUKSES")
	}).catch(err => {
		res.send("GAGAL")
	})
})


module.exports = router;