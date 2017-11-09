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

app.locals.Helper = require('./helpers/helper');
app.use('/', Index)
app.use('/user', User)
app.use('/admin', Admin)

app.listen(3000, () => console.log('Example app listening on port 3000!'))