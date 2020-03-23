const express = require('express');
const Product = require('../controller/products')
const user = require('../controller/users');
const auth = require('../controller/auth');

// const csrf = require('csurf');
// var csrfProtection = csrf();
const proRoute = express.Router();
// proRoute.use(proRoute);

proRoute.post('/new_product',auth.allowIfLoggedin,Product.newProduct)
proRoute.get('/all_products',auth.allowIfLoggedin,Product.all_products);
proRoute.get('/product/:productId',auth.allowIfLoggedin,Product.readProduct)
proRoute.delete('/product/:productId',auth.allowIfLoggedin, Product.deleteProduct);
 proRoute.put('/product/:productId',auth.allowIfLoggedin, Product. updateProduct);
proRoute.get('/list',auth.allowIfLoggedin,Product.list);
proRoute.get('/relatedProd/:productId',Product.relatedProd);
proRoute.get('/categoryList',auth.allowIfLoggedin,Product.categoryList)
proRoute.post('/searchList',Product.searchList);
proRoute.get('/photo/:productId',Product.photo)
proRoute.get('/category_all',Product.category_all)



proRoute.param('userId',user.userId)

proRoute.param('productId',Product.productID)

module.exports = proRoute