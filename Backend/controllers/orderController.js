const orderModel = require('../models/orders');
const UserModel = require('../models/user');
const Stripe =require('stripe');
//const Razerpay = require('razorpay');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// const razerpayInstance = new Razerpay({
//     key_id:process.env.RAZERPAY_ID,
//     oauthToken:"ACCESS_TOKEN",
//     key_secret:process.env.RAZERPAY_SECRET_KEY,
// })

const currency='inr';
const deliveryCharge=10;


//placing orders using COD method
module.exports.CodOrder=async(req,res,next)=>{
    try {
        const {_id}=req.user;
        const {items,amount,address}=req.body;

         if(!_id){
             res.status(400).json({success:false,message:'Invalid user Plz login'})
         }

         const orderdata= await orderModel.create({
             userId:_id,
             items,
             amount,
             address,
             paymentMethod:'COD',
         })
         
         await UserModel.findByIdAndUpdate(_id,{usercart:{}});

          res.status(201).json({success:true ,message:'Order placed'});


    } catch (error) {
        res.status(400).json({success:false,message:error.message})
    }
}

//placing orders using Stripe method
module.exports.StripeOrder=async(req,res,next)=>{
   try {
       const {_id}=req.user;
       const {items,amount,address}=req.body;
       const origin=req.headers.origin;
        
         if(!_id){
             res.status(400).json({success:false,message:'Invalid user Plz login'})
         }

         const orderdata= await orderModel.create({
             userId:_id,
             items,
             amount,
             address,
             paymentMethod:'Stripe',
         })
         
         await UserModel.findByIdAndUpdate(_id,{usercart:{}});

         const line_items=items.map((item)=>({
            price_data:{
                currency:currency,
                product_data:{
                    name:item.name
                },
                unit_amount:item.price * 100
            },
            quantity:item.Quantity
         }))

         line_items.push({
             price_data:{
                currency:currency,
                product_data:{
                    name:'DeliveryCharges'
                },
                unit_amount:deliveryCharge * 100
            },
            quantity:1
         })

         const session = await stripe.checkout.sessions.create({
            success_url:`${origin}/myorder`,
             cancel_url:`${origin}/cart`,
            // success_url:`${origin}/verify?success=true$orderId=${orderdata._id}`,
            // cancel_url:`${origin}/verify?success=false$orderId=${orderdata._id}`,
             line_items,
             mode:'payment'
         })

        await orderModel.findByIdAndUpdate(orderdata._id,{payment:'true'});
        await UserModel.findByIdAndUpdate(_id,{usercart:{}});

         res.json({success:true,session,message:'payment successful'})
    
   } catch (error) {
     res.status(400).json({success:false,message:error.message})
   }
}

// module.exports.verifypayment=async(req,res)=>{
//     const {orderId,success,}=req.body
//     const {_id}=req.user;

//     try {
//         if(success === 'true'){
//             await orderModel.findByIdAndUpdate(orderId,{payment:'true'});
//             await UserModel.findByIdAndUpdate(_id,{usercart:{}});

//              res.status(200).json({success:true,message:'payment successful'})
//         }else{
//             await orderModel.findByIdAndDelete(orderId);
//             res.json({success:false})
//         }
//     } catch (error) {
//         res.status(400).json({success:false,message:error.message})
//     }
// }

//placing orders using Razerpay method
module.exports.RazerOrder=async(req,res,next)=>{
    try {
         const {_id}=req.user;
       const {items,amount,address}=req.body;
       const origin=req.headers.origin;
        
         if(!_id){
             res.status(400).json({success:false,message:'Invalid user Plz login'})
         }

         const orderdata= await orderModel.create({
             userId:_id,
             items,
             amount,
             address,
             paymentMethod:'Razorpay',
         })
         
         await UserModel.findByIdAndUpdate(_id,{usercart:{}});

         const options={
            amount:amount*100,
            currency:currency.toUpperCase(),
            receipt:orderdata._id
         }

         await razerpayInstance.orders.create(options,(error,order)=>{
            if(error){
                res.status(400).json({success:false,message:error})
            }

            res.json({success:true,order})
         })

    } catch (error) {
        res.status(400).json({success:false,message:error.message})
    }
}

module.exports.verifyRazorpay=async(req,res)=>{
    try {
        const {razorpayid}=req.body
        const {_id}=req.user

        const orderInfo = await razerpayInstance.orders.fetch(razorpayid);
        if(orderInfo.status === 'paid'){
            await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:'true'});
            await UserModel.findByIdAndUpdate(_id,{usercart:{}});

            res.json({success:true,message:'payment successful'})
        }else{
            res.json({success:false,message:'payment failed'})
        }

    } catch (error) {
        res.status(400).json({success:false,message:error.message})
    }
}

//get allorders for user
module.exports.Allorder=async(req,res,next)=>{
    try {
        const {_id}=req.user
        const userorder= await orderModel.find({userId:_id});
        // console.log(userorder);
         
        res.status(200).json({success:true,userorder,message:'user order product'})
        
    } catch (error) {
        res.status(400).json({success:false,message:error.message})
    }

}

//Update status
module.exports.Updatestatus=async(req,res,next)=>{
   try {
      const {orderId,status}=req.body;
       await orderModel.findByIdAndUpdate(orderId,{status});
       res.status(200).json({success:true,message:'status updated.'})
   } catch (error) {
     res.status(400).json({success:false,message:error.message})
   }
}
//order list for admin
module.exports.Orderlist=async(req,res,next)=>{
     try {
          
         const allorderdata= await orderModel.find({});
 
          res.status(200).json({success:true ,allorderdata});

    } catch (error) {
        res.status(400).json({success:false,message:error.message})
    }
}


