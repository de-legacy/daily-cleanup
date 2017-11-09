const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const session = require('express-session')

app.use(express.static(__dirname + '/library'));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
	secret: "successlogged"
}))

const Index = require("./routers/index")
const User	= require("./routers/user")
const Admin = require("./routers/admin")
// const Order = require("./routers/order")
// const Worker = require("./routers/Worker")

app.locals.Helper = require('./helpers/helper');
app.use('/', Index)
app.use('/user', User)
app.use('/admin', Admin)
// app.use('/order', Order)
// app.use('/worker', Worker)


// app.get('/test/top-workers', (req, res) => {
// 	res.render('top-workers');
// })

app.get('/test/thankyou', (req, res) => {
	res.render('thankyou', {title: 'Terima kasih telah bergabung', content: 'Silahkan mulai melakukan pemesanan pada link dibawah', link: '/test/pemesanan'});
})

app.get('/test/pemesanan', (req, res) => {
	res.render('list-workers');
})

app.get('/test/admin/workers', (req, res) => {
	res.render('admin/all-workers');
})

app.get('/test/admin/workers/banned', (req, res) => {
	res.render('admin/all-banned-workers');
})

// app.get('/test/admin/workers/add', (req, res) => {
// 	res.render('admin/add-worker');
// })

app.get('/test/admin/workers/edit/:workerId', (req, res) => {
	res.render('admin/add-worker');
})

app.get('/test/admin/users/edit/:userId', (req, res) => {
	res.render('admin/add-user');
})

app.listen(process.env.PORT || '3000', () => console.log('Example app listening on port 3000!'))