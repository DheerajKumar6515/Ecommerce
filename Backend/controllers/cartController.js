const UserModel = require('../models/user');



module.exports.addcartItem=async(req,res,next)=>{
    try {
        //required data through req.body
    const {_id}=req.user;
    const {Itemid,size}=req.body;
    
    //get user to database
    const userData =await UserModel.findById(_id);
    const cartData= userData.usercart || {};
    

    if(cartData[Itemid]){
        if(cartData[Itemid][size]){            
            cartData[Itemid][size] += 1;
        }else{
            cartData[Itemid][size] = 1;
        }
    }else{
        cartData[Itemid]={};
        cartData[Itemid][size] = 1;
    }
     
    
    //save data
     await UserModel.findByIdAndUpdate(_id,{usercart:cartData});

     //send message
     res.status(201).json({success:true,cartData,message:'Add to cart.'})
    } catch (error) {
        console.log(error)
         res.status(201).json({success:false,message:error.message})
    }
}

module.exports.Updatecart=async(req,res,next)=>{
   
    try {
        const {_id}=req.user;
        const {Itemid,size,Quantity}=req.body;

        const user= await UserModel.findById(_id);
        const cartData = user.usercart || {};

        cartData[Itemid][size] = Quantity;

        await UserModel.findByIdAndUpdate(_id,{usercart:cartData});

        res.status(200).json({success:true,cartData,message:"Update Item."})

    } catch (error) {
        res.status(400).json({success:false,message:'not updated'})
    }
}

module.exports.getUsercart=async(req,res,next)=>{
   try {
        const {_id}=req.user;

        const user= await UserModel.findById(_id);
        const cartData = user.usercart || {};

        res.status(200).json({success:true,cartData})

    } catch (error) {
        res.status(400).json({success:false,message:'not get cartdata'})
    }
}