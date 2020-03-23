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

const newCategory = (req,res) => {
	const {name} = req.body;
	if(!name || name =="" ) {
	res.send("category is empty")
} else {
	Category.findOne({name:name}).then((category)=> {
		if(category) {
			
			res.redirect('/category/all_category')
		}else {
			const caategory = new Category({
					name : req.body.name
				})
			caategory.save().then((category)=> {
				res.redirect('/category/all_category')
			}).catch((error)=> {
				throw error
			})

		}
		
		

		
	}).catch((error)=> {
		console.log('error in category creation')
		throw error
	})
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



