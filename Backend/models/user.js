const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    usercart:{
        type:Object,
        default:{}
    }
},{timestamps:true});

module.exports= mongoose.models.user || mongoose.model('user',userSchema);