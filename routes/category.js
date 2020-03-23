const express = require('express');
const category = require('../controller/category');
const auth = require('../controller/auth')
const cateRoute = express.Router();

cateRoute.post('/new_category',auth.allowIfLoggedin,auth.isAdmin,category.newCategory); //creation of a new category
cateRoute.get('/all_category',category.category_all) ;//displays all categories
cateRoute.put('/categoryUpdate/:id',auth.allowIfLoggedin,category.categoryUpdate)
cateRoute.delete('/category_delete/:id',auth.allowIfLoggedin,category.categoryRemove);
cateRoute.get('/edit_category/:id',category.edit_category); //takes us to the category edit page
cateRoute.get('/single_category/:singleCategory',category.single_cate_page)

cateRoute.param('singleCategory',category.singleCategory)

module.exports = cateRoute