const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
     description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:[],
        required:true
    },
    category:{
        type:String,
        required:true
    },
    subcategory:{
        type:String,
        required:true
    },
    sizes:{
        type:[],
        required:true
    },
    bestseller:{
        type:Boolean,
    },
},{timestamps:true});



module.exports = mongoose.models.product || mongoose.model('product',productSchema);