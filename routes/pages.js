//this will redirect you to all the pages

const express = require('express');
const Pages = require('../controller/pages');
const product = require('../controller/products')
const auth = require('../controller/auth')
// const csrf = require('csurf');
// var csrfProtection = csrf();

const router = express.Router();

// router.use(csrfProtection)

router.get('/',Pages.landing) ; //index page
router.get('/home',auth.allowIfLoggedin,Pages.home); //thi is the home page and should be authenticated

router.get('/login',Pages.login_page); //display the login page
router.get('/singup',Pages.singup_page); //display the singup page

//admin dashboard
router.get('/admin_dashboard',auth.allowIfLoggedin,auth.isAdmin,Pages.admin_dashboard)
router.get('/new_category',auth.allowIfLoggedin,Pages.new_category);
router.get('/new_product',auth.allowIfLoggedin,Pages.new_product);
router.get('/product_page',auth.allowIfLoggedin,auth.isAdmin,Pages.product_page);
router.get('/edit_page/:productId',auth.allowIfLoggedin,Pages.edit_page);
// router.get('/shop',auth.allowIfLoggedin,Pages.shop);


router.param('productId',product.productID)





module.exports = router