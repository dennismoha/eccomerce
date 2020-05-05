/*
	only admin is allowed to create, read,update and delete category

*/

const Category = require('../model/category');

const singleCategory = (req,res,next,id) => {
	Category.findById(id).exec((err,category)=>{
		if(err || !category) {
			throw err
		}
		req.category  = category;
		next();
	});
}



//new category

const newCategory =(req,res) => {
	req.checkBody('name','title cannot be empty').notEmpty()

	var name = req.body.name;
	var sep = name.replace('/\s+/g','-').toLowerCase();

	var errors = req.validationErrors();
				if(errors) {
					var messages = [];
					errors.forEach(function(error) {
							messages.push(error.msg)
						})	
						req.flash('error',messages)
						console.log(messages)
					res.render('admin/category',{messages:req.flash('error'),title:req.body.title})			
				}
}

//displaying all the categories
const category_all = (req,res)=> {
	Category.find().then((categories)=> {
		res.render('admin/all_categories',{category:categories})
	}).catch((Err)=>{
		throw err
	})
}

// //update a specific category
const categoryUpdate = (req,res)=>{
  const category = new Category({
    _id: req.params.id,
    name: req.body.name,
   
  });
  Category.updateOne({_id: req.params.id},category).then(
    () => {
     res.redirect('/category/all_category')
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

//remove a specific category
const categoryRemove = (req,res)=> {
	Category.findByIdAndRemove(req.params.id).then(()=> {
		
		res.redirect('/category/all_category')
	})
	.catch((error)=> {
		console.log('error in deleting catergory');
		throw error
	})
}

const edit_category = (req,res) => {
	Category.findById(req.params.id).then((category)=> {
		if(category) {
			res.render('admin/category_edit',{category:category})
		}
	}).catch((error)=> {
		console.log('error in the category edit route')
		throw error;
	})
}

const single_cate_page = (req,res) => {
	const category = req.category
	res.render('admin/products/single_category',{category:category})
}



module.exports = {newCategory,category_all,categoryUpdate,categoryRemove,edit_category,singleCategory,single_cate_page}



