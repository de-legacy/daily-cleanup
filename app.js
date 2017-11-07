const express = require('express');
const app = express();
var bodyParser = require('body-parser')

app.use(express.static(__dirname + '/library'));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const User = require("./routers/user")
// const Order = require("./routers/order")
// const Worker = require("./routers/Worker")


app.use('/user', User)
// app.use('/order', Order)
// app.use('/worker', Worker)


app.get('/', (req, res) => {
	res.render('index');
})

app.get('/test/login', (req, res) => {
	res.render('login');
})

app.post('/test/login', (req, res) => {
	res.redirect('/test/pemesanan');
})

app.get('/test/register', (req, res) => {
	res.render('register');
})

app.get('/test/top-workers', (req, res) => {
	res.render('top-workers');
})

app.get('/test/thankyou', (req, res) => {
	res.render('thankyou', {title: 'Terima kasih telah bergabung', content: 'Silahkan mulai melakukan pemesanan pada link dibawah', link: '/test/pemesanan'});
})

app.get('/test/pemesanan', (req, res) => {
	res.render('list-workers');
})

app.get('/test/order-services', (req, res) => {
	res.render('thankyou', {title: 'Terima kasih atas pesanannya', content: 'Silahkan cek pesanan anda pada link dibawah', link: '/test/user/orders'});
})

app.get('/test/user/orders', (req, res) => {
	res.render('list-orders');
})

app.get('/test/user/order-complete', (req, res) => {
	res.render('order-complete-form');
})

app.post('/test/user/order-complete', (req, res) => {
	res.send(req.body);
})

app.get('/test/admin/users', (req, res) => {
	res.render('admin/all-users');
})

app.get('/test/admin/workers', (req, res) => {
	res.render('admin/all-workers');
})

app.get('/test/admin/workers/banned', (req, res) => {
	res.render('admin/all-banned-workers');
})

app.get('/test/admin/workers/add', (req, res) => {
	res.render('admin/add-worker');
})

app.get('/test/admin/workers/edit/:workerId', (req, res) => {
	res.render('admin/add-worker');
})

app.get('/test/admin/users/edit/:userId', (req, res) => {
	res.render('admin/add-user');
})

app.listen(3001, () => console.log('Example app listening on port 3000!'))