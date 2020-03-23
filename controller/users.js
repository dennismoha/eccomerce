const User = require('../model/users');
const csurf = require('csurf')
const bcrypt = require('bcrypt');


var protection = csurf();

const userId = (req,res,next,id) => {
	User.findById(id).exec((error,user)=> {
		if(error || !user) {
			console.log('error in the user by id')
			throw error
		}
		req.user = user;
		next();
	})
}


// const singup = (req,res) => {
	
	
// 	const {firstname, lastname,email,phone_number, password,password2,role} = req.body;
// 	let errors = [];

// 	if(!firstname || !lastname || !email || !phone_number || !password || !password2 || !role) {
// 		errors.push({message: "please fill in all the requirements"})
// 	}
	
// 	if(password !== password2) {
// 		errors.push({message: "password do not match"})
// 	}

// 	if(password.length < 6) {
// 		errors.push({message: "password cannot be less than 6 characters"})
// 	}

// 	if(phone_number.length < 10) {
// 		errors.push({message: "phone number should be length 10"})
// 	}else {
// 		User.findOne({phone_number}).then((phone_number)=> {
// 			if(phone_number) {
// 				errors.push({message:"phone is arleady taken"})
// 			}
// 		})
// 	}

// 	if(errors.length > 0) {
// 		res.render('home/singup',{
// 			errors,firstname,lastname, email,phone_number, password, password2
// 		})
// 	} else {
// 		User.findOne({email:email})
// 		.then(user => {
// 			if(user)   {
// 				errors.push({message:"Email is arleady taken"});
// 				res.render('home/singup',{
// 					errors,firstname, lastname,email,phone_number, password, password2
// 				})
// 			}else {
				
// 				bcrypt.hash(req.body.password, 10).then((hash)=> {
// 					const user = new User({
// 						firstname,
// 						lastname,						
// 						email,
// 						phone_number,
// 						role,
// 						password:hash
// 					});
					
// 					user.save().then(
// 						()=>{
// 							//req.flash('success','your now registered! login')							
// 							 // res.redirect('/users/home_page')
// 							 console.log(user)
// 							 res.redirect('/home')
							
// 						}).catch((error)=>{
// 							throw error
// 						})
// 				}).catch((error)=> {
// 					throw error
// 				})
// 			}
// 		})
// 	}
		
// }


const singup = (req,res) => {
	
	
	const {firstname, lastname,email,phone_number, password,password2,role} = req.body;
	let errors = [];

	// if(!firstname || !lastname || !email || !phone_number || !password || !password2 || !role) {
	// 	errors.push({message: "please fill in all the requirements"})
	// }
	
	if(password !== password2) {
		errors.push({message: "password do not match"})
	}

	if(password.length < 6) {
		errors.push({message: "password cannot be less than 6 characters"})
	}

	if(phone_number) {
		User.findOne({phone_number}).then((phone_number)=> {
			if(phone_number) {
				errors.push({message:"phone is arleady taken"})
			}
		})
	}

	if(errors.length > 0) {
		res.render('home/singup',{
			errors,firstname,lastname, email,phone_number, password, password2
		})
	} else {
		User.findOne({email:email})
		.then(user => {
			if(user)   {
				errors.push({message:"Email is arleady taken"});
				res.render('home/singup',{
					errors,firstname, lastname,email,phone_number, password, password2
				})
			}else {
				
				bcrypt.hash(req.body.password, 10).then((hash)=> {
					const user = new User({
						firstname,
						lastname,						
						email,
						phone_number,
						role,
						password:hash
					});
					
					user.save().then(
						()=>{
							//req.flash('success','your now registered! login')							
							 // res.redirect('/users/home_page')
							 console.log(user)
							 res.redirect('/home')
							
						}).catch((error)=>{
							throw error
						})
				}).catch((error)=> {
					throw error
				})
			}
		})
	}
		
}


const all_users = (req,res) => {
	User.find().then((user)=> {
		if(user) {
			res.render('admin/users/view_users',{user:user})
		}
	}).catch((error)=> {
		throw error
	})
}

const new_user = (req,res) => {
	res.render('admin/users/create_user')
}
	
const profile = (req,res) => {
	req.profile.password = undefined;
	return res.json(req.profile)
}

//csrf test route
const test = (req,res) => {
	res.render('admin/products/view_product',{ csrfToken: req.csrfToken() })
}

//logout module
const logout = (req,res)=> {
	req.logout();
	req.flash('sucess',"your are logged out");
	res.redirect('/');
}


module.exports = {singup,logout,all_users,new_user,userId,profile,test}
				
				
				 