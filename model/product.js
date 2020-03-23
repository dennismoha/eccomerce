const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
	title: {
            type: String,
            trim: true,
            
            maxlength: 32
        },
        description: {
            type: String,
            required: true,
            maxlength: 2000
        },
        price: {
            type: Number,
            trim: true,
            required: true,
            maxlength: 32
        },     

        category: [{
            
               type:mongoose.Schema.Types.ObjectId,
               ref: 'category' 

            
        }],
        quantity: {
            type: Number
        },   

        sold: {
            type:Number,
            default:0
        }  ,   
        photo: {
            data:Buffer,
            contentType: String //buffer, allows us store images in data in form of arrays
            
        },
        // reviews:[{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'reviews'
        // }] ,
        Owner: {
            id: {
                type:mongoose.Schema.Types.ObjectId,
                ref: 'users_singup'
            },
            owner:String
        } ,
        shipping: {
            required:false,
            type:Boolean
        }      

},{timestamps:true})

module.exports = mongoose.model('property',propertySchema)