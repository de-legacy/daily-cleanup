const express = require('express');
const app = express();

app.use(express.static(__dirname + '/library'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('index');
})

app.get('/test/login', (req, res) => {
	res.render('login');
})

app.get('/test/register', (req, res) => {
	res.render('register');
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

app.listen(3000, () => console.log('Example app listening on port 3000!'))