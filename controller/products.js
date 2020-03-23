/*admin can create properties
	Can update and delete properties 
	can view all properties
	=============users ========
	can view all properties
	can click on a single property
	can view properties by category
*/

const Product = require('../model/product');
const category = require('../model/category')

const formidable = require('formidable');
const _= require('lodash');
const fs = require('fs')

const productID =(req,res,next,id) => {
	Product.findById(id).populate('category').then((product)=> {
		if(product){
			req.product = product;
			next();
		}
	}).catch((error)=> {
		console.log('error in the find product by id')
		throw error
	})
}



//unique product page
 const show_product_page = (req,res) => {
	
}

const newProduct_page = (req,res) => {
}

const newProduct = (req,res) => {

	let form = new formidable.IncomingForm();
	form.keepExtensions = true;
	form.parse(req,(err,fields,files)=> {
		
		if(err) {
			throw err
		}

		let product = new Product(fields);
		
		

		// const {title,description,price,quantity,photo} = fields
		// if(!title || !description || !price || !quantity || !photo) {
		// 	res.send('all fields are required')
		// }

		if(files.photo) {
			if(files.photo.size > 1000) {
				console.log('file is greater than 1kb')
			}
			product.photo.data = fs.readFileSync(files.photo.path);
			product.photo.contentType = files.photo.type;
		}

		product.save((err,results)=> {
			if(err) {
				console.log('error saving products')
				throw err
			}
						
			res.redirect('/product/all_products')
		})
	})
}



const all_products = (req,res) => {
	Product.find({}).populate('category').exec((err, product)=> {
		if(err){
			throw err
		} 
	
		res.render('admin/products/view_products',{products:product})
	})
}

//show the full details of one product upon getting clicked
const readProduct =(req,res)=> {
	req.product.photo = undefined;
	const product = req.product
	console.log(product);
	return res.render('admin/products/show', {product:product});
}

//handles the deleting of a single property
const deleteProduct = (req,res) => {
	const product = req.product;	
	
	product.remove((err,success)=> {
		if(err) {
			console.log('error');
			throw error
		}
		console.log('removed product')
		res.redirect('/product/all_products')
	})
}

//handles the update of a single property

const updateProduct = (req,res,next)=> {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;
	form.parse(req,(err,fields,files)=> {
		if(err) {
			throw err
		}

		let product = req.product;
		product = _.extend(product, fields)

		// const {title,description,price,quantity,photo} = fields
		// if(!title || !description || !price || !quantity || !photo) {
		// 	res.send('all fields are required')
		// }

		if(files.photo) {
			if(files.photo.size > 1000) {
				console.log('file is greater than 1kb')
			}
			product.photo.data = fs.readFileSync(files.photo.path);
			product.photo.contentType = files.photo.type;
		}

		product.save((err,results)=> {
			if(err) {
				console.log('error saving products')
				throw err
			}
			console.log(results);

			res.redirect('/product/all_products')
		})
	})
	
}

//search and sort
const list = (req,res) => {
	console.log(req.query)
	let order = req.query.order ? req.query.order : 'asc'
	let sortBy = req.query.sortBy ? req.query.sortBy: 'id'
	let limit = req.query.limit ? parseInt(req.query.limit):6

	Product.find()
		.select("-photo")
		.populate('category')
		.sort([[sortBy,order]])
		.limit(limit)
		.exec((err,product)=>{
			if(err) {
				console.log(err);
				res.status(400).json({message:'error in getting products'})
			}
			res.render('home/filter',{products:product})
		})



}

// // landing search and sort
// const list_landing = (req,res) => {
// 	console.log(req.query)
// 	 req.query.sortBy = 'sold';
// 	 req.query.order ='createdAt';

// 	let order = req.query.order ? req.query.order : 'asc'
// 	let sortBy = req.query.sortBy ? req.query.sortBy: 'id'
// 	let limit = req.query.limit ? parseInt(req.query.limit):6

// 	Product.find()
// 		.select("-photo")
// 		.populate('category')
// 		.sort([[sortBy,order]])
// 		.limit(limit)
// 		.exec((err,product)=>{
// 			if(err) {
// 				console.log(err);
// 				res.status(400).json({message:'error in getting products'})
// 			}
// 			res.render('home/filter',{products:product})
// 		})



//  }

//find products in the same category
const relatedProd = (req,res) => {
	const limit = req.query.limit ? parseInt(req.query.limit) : 5;
	Product.find({id:{$ne:req.product},category:req.product.category})
	.limit(limit)
	.populate('category')
	.exec((err, product)=> {
		if(err) {
			throw err
		}
		res.json(product)
	})
}

const categoryList = (req,res)=> {
	Product.distinct('category',{},(err,category)=> {
		if(err) {
			throw err
		}
		console.log(category)
		res.render('home/shop',{category:category})
	})
}

const searchList = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};
 
    
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key]; //contains the category id and the price range
            }
        }
    }
 
    Product.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};


const photo = (req,res,next) => {
	if(req.product.photo.data) {
		res.set('Content-Type',req.product.photo.contentType)
		return res.send(req.product.photo.data)
	}
	next();
}

//displaying all the categories
const category_all = (req,res)=> {
	category.find().then((categories)=> {
		res.render('home/shop',{category:categories})
	}).catch((Err)=>{
		throw err
	})
}


module.exports ={newProduct,newProduct_page,all_products,productID,readProduct,
				deleteProduct,updateProduct,list,relatedProd,categoryList,searchList,
				photo,category_all}