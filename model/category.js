const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
	name:{type:String},
	sep:{type:String} // makes sure only unique categories are added
})

module.exports = mongoose.model('category',categorySchema)