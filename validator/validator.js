const express = require('express')
const { check, validationResult } = require('express-validator');

const  userSignupValidator = (req,res,next)=> {
	req.check('firstname','Firstname is required').notEmpty()
	req.check('lastname','lastname is required').notEmpty()
	req.check('email','Email must be between 3 to 32 characters')
		.matches(/.+\@.+\../)
		.withMessage('email must contain @')
		.isLength({
			min: 4,
			max: 32
		});

	req.check('phone_number')
	.notEmpty()
	.withMessage('phone number cannot be empty')
	// .isNumeric()
	// .withMessage('phone number can only be numeric')
	
	req.check('password')
		.isLength({min: 6})
		.withMessage('password must contain atleast 6 characters')
		.matches(/\d/) //must have atleast one digit and number
		.withMessage('password must contain a number');


	const errors = req.validationErrors() //this method grabs all the errors
	if(errors) { //goes through the errors and shows any error in the errors variable
		const firstError = errors.map(error => error.msg)[0];
		req.flash('error',firstError)
		

		return res.render('home/singup',{errors:req.flash('error')})
	}
	next();

}

module.exports = userSignupValidator