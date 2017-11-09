const express 		= require('express');
const router 		= express.Router();
const session 		= require('express-session')
const bcrypt		= require('bcrypt');


const Model = require("../models")
const checklogin = require ("../helpers/checklogin")


// Home User

router.get('/list-workers', checklogin, (req,res) => {
	Model.Worker
	 .findAll()
	  .then(allWorker => {
		res.render('list-workers', {allWorker : allWorker, loggedIn: req.session.loggedIn, privelege: req.session.privelege})
	})
})

router.get('/order-services/:id', checklogin, (req, res) => {
	Model.User
	 .findOne({
		where : {
			username : req.session.username
		}
	 })
	  .then(user => {
		Model.Order
		 .create({
			UserId : user.id,
			WorkerId : req.params.id,
			rating : 0
		 })
		  .then(() => {
		 	 res.render('thankyou', {title: 'Terima kasih atas pesanannya', content: 'Silahkan cek pesanan anda pada link dibawah', link: user.id, loggedIn: req.session.loggedIn, privelege: req.session.privelege});
		  })
		   .catch(err => {
		  	  console.log(err);
			  res.send(err);
		   })		
	  })
	   .catch(err => {
	  	  console.log(err);
		  res.send(err);
	   })
})


router.get('/orders', checklogin, (req,res) => {
	Model.User
	.findOne({
		where : {
			username : req.session.username
		}
	})
	 .then(user => {
		res.redirect(`/user/orders/${user.id}`)
	 })
	  .catch(err => {
	  	console.log(err);
		res.send(err);
	  })
})

router.get('/orders/:id', checklogin, (req, res) => {
	Model.Order
	.findAll({
		attributes : ['id', 'UserId', 'WorkerId', 'rating', 'message', 'createdAt', 'updatedAt', 'status'],
		include : [Model.User,Model.Worker],
		where : {
			UserId : req.params.id
		},
		order : [['createdAt', 'DESC']]
	})
	 .then(userOrder => {
		res.render('list-orders', {orders : userOrder, loggedIn: req.session.loggedIn, privelege: req.session.privelege});
	 })
	  .catch(err => {
	  	console.log(err);
		res.send(err);
	  })	 
})

router.get('/order-complete/:id', checklogin, (req, res) => {
	Model.Order
	 .findOne({
		where : {
			id : req.params.id
		}
  	 })
	  .then(worker => {
		res.render('order-complete-form', {order : worker, loggedIn: req.session.loggedIn, privelege: req.session.privelege});
      })
})

router.post('/order-complete/:id', checklogin, (req, res) => {
	Model.Order
	 .update({
		message: req.body.message,
		rating: req.body.rating,
		status: true
	 }, { where : {
		id : req.params.id
	 }})
	  .then(() => {
		Model.Order
		 .findOne({
			where : {
				WorkerId : req.body.WorkerId
			},
			attributes: ['WorkerId', [Model.sequelize.fn('AVG', Model.sequelize.col('rating')), 'average']],
			group: 'WorkerId'
		 })
		  .then(avg => {
			Model.Worker
			 .update({
				averagerating : avg.dataValues.average
			 }, {where : {
				id : avg.WorkerId
			 }})
			  .then(() => {
				res.redirect('/user/list-workers')
		      })
			   .catch(err => {
			  	 console.log(err);
				 res.send(err);
			   })			 
		  })
		   .catch(err => {
	  	     console.log(err);
		     res.send(err);
	       })		  
	  })
	  .catch(err => {
	  	console.log(err);
		res.send(err);
	  })	 
})	
module.exports = router;