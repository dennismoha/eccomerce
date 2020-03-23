const express = require('express');
const user = require('../controller/users')
const Pages = require('../controller/pages')
const passport = require('passport')
const auth = require('../controller/auth');
const validator = require('../validator/validator')
// const csrf = require('csurf');
// var csrfProtection = csrf();
const authRoute= express.Router()

// authRoute.use(csrfProtection);



authRoute.post('/login',(req,res,next)=> {	

	passport.authenticate('local',{

		successRedirect : '/home',
		
		failureRedirect: '/',
		failureFlash : true,
		successFlash : "welcome to the site"
	})(req,res,next);	
	

});

authRoute.post('/register',validator,user.singup)
authRoute.get('/logout',user.logout)
authRoute.get('/all_users',auth.allowIfLoggedin,auth.isAdmin,user.all_users)
authRoute.get('/new_user',user.new_user)
authRoute.get('/profile/:userId',user.profile);//check on the error
authRoute.get('/test',user.test)

authRoute.param('userId',user.userId);


module.exports = authRoute;



