const userModel = require('../models/user');
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/user');


module.exports.createUser=async(req,res,next)=>{
    try{

    //checking validation error
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    
    //get all fields
    let {name,email,password}=req.body;
    name=name.toLowerCase();
    email=email.toLowerCase();
    password=password.toLowerCase();


     //check all fields are available 
     if(!name && !email && !password){
        return res.status(401).json({success:false,message:'All fileds are required !'})
     }
    
    //find users in database 
     const users = await userModel.findOne({email:email});
     if(users){
        return res.status(401).json({success:false, message:'User already exists.'})
     }

    //Encrypt password
    const hashpassword = await bcrypt.hash(password,10);

    //creae user
    const user = await userModel.create({
        name,
        email,
        password:hashpassword
    })

    //create token
     const token = jwt.sign({id:user._id, email:user.email},process.env.SECRET_KEY);
    
    //create cookie
     res.cookie('token',token);

    //sending success message
     res.status(201).json({success:true,user,token});
    
}catch(error){
    console.log(error);   
    res.json({success:false,message:error.message})
}


}

module.exports.loginUser = async(req,res,next)=>{

    try{
    
    //check validation errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    //get all fields
     let {email,password}=req.body
     email=email.toLowerCase();
     password=password.toLowerCase()

     //check all fields available or not
     if(!email && !password){
        return res.status(400).json({success:false, message:'required all fields'})
     }

     //check unauthorized user login
     const users = await userModel.findOne({email});
     if(!users){
        return res.status(401).json({success:false,message:'Please SignUp.'})
     }

     //bcrypt password
     const isMatch = await bcrypt.compare(password,users.password);

     if(isMatch){
        
        //then generate token
        const token = jwt.sign({id:users._id, email:users.email}, process.env.SECRET_KEY);
        //then generate cookie
        res.cookie('token',token);

        //send success message
        res.status(201).json({success:true,users,token})
     }else{
        res.status(401).json({success:false, message:'Invalid Login Details.'})
     }

    }catch(error){
        console.log(error);   
        res.json({success:false,message:error.message})
    }

}

module.exports.updatepassword= async(req,res,next)=>{

   try {
        //check validation error
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    //get all fields
    const {name,password,cfpassword}=req.body;

    if(!name && !password && !cfpassword){
        return res.status(400).json({success:false,message:"Required all fields."})
    }

    //check if user exists or not
    const user = await userModel.findOne({name});
    if(!user){
        return res.status(401).json({success:false,message:'Invalid user.'})
    }

    if(password === cfpassword){
      
        //Encrypt password
        const hashpassword = await bcrypt.hash(password,10);

        user.password=hashpassword;
        await user.save();

        res.status(200).json({success:true,message:"Update password."})

    }else{
        res.status(400).json({success:false,message:"Password or confirmPassword is not match."})
    }

    
   } catch (error) {
     console.log(error);
     res.status(400).json({success:false,message:error.message})
     
   }

}

module.exports.adminLogin=async(req,res,next)=>{
    try {

         //check validation error
        const errors=validationResult(req);
        if(!errors.isEmpty()){
           return res.status(400).json({errors:errors.array()})
        }

        const {email,password}=req.body;

        if(!email || !password){
            res.status(400).json({success:false,message:'Invalid login details.'})
        }

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const admintoken = jwt.sign({email,password},process.env.ADMIN_SECRET_KEY);
            res.cookie('admintoken',admintoken);
            res.json({success:true,admintoken,message:"Login successful."});
        }
    } catch (error) {
        res.status(400).json({success:false,message:error.message})
    }
}
