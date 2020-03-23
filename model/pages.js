const mongoose = require('mongoose');


const pagesSchema = new mongoose.Schema({
	title:{type:String,required:true},
	slug:{type:String},
	content:{type:String},
	sorting:{type:Number}
})

module.exports = mongoose.model('page',pagesSchema)