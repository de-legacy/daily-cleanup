const express 		= require('express');
const bodyParser 	= require('body-parser');
const app	 		= express();


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('views', './views')
app.set('view engine', 'ejs')

const User = require("./routers/user")
// const Order = require("./routers/order")
// const Worker = require("./routers/Worker")


app.use('/user', User)
// app.use('/order', Order)
// app.use('/worker', Worker)


app.post('')
app.listen(3001)