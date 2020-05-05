const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const Validator = require('express-validator')
const session = require('express-session')
const flash = require('connect-flash');
const methodOverride = require('method-override');
const passport = require('passport')
const ejs = require('ejs')


const app = express();


require('./config/passport')(passport);

app.set('view engine','ejs');
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + '/public/js'));
app.use(Validator())

const pages = require('./routes/pages')
const users = require('./routes/users');
const category = require('./routes/category');
const products = require('./routes/products')

mongoose.connect('mongodb://localhost:27017/diana_eccomerce', {useNewUrlParser: true});
//express session
app.use(session({
	secret: "secretstringauth",
	resave: true,
	saveUninitialized: true,
	cookie: {secure:true}
	
}));

//app.use(express.urlencoded({extended:true}));
//body-parser middleware but in express
app.use(bodyParser.urlencoded({ extended: false })); 
// parse application/json
app.use(bodyParser.json());



//initializing passport
app.use(passport.initialize());
app.use(passport.session());

app.use(flash())

//method override for delete and edit
app.use(methodOverride('_method'));

//global variables
app.use((req,res,next)=> {
	res.locals.currentUser = req.user;
	res.locals.property_got = req.property
	res.locals.info = req.flash('info');
	res.locals.errors =  req.flash('errors');	
	res.locals.error_login =  req.flash('error_login');
	next();
});



app.use('/',pages)
app.use('/users',users)
app.use('/category',category);
app.use('/product',products)

app.listen(process.env.PORT || 8080 ,(err,success)=> {
	if(err) {
		console.log('error starting the server')
	}
	console.log('server successfully connected')
})