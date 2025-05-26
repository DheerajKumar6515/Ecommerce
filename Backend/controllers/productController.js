const productModel =require('../models/products');
const {validationResult}=require('express-validator')
//const { cloudinary }= require('cloudinary').v2;
//const UploadimageOncloudinary = require('../utils/cloudinary')


module.exports.addProducts = async(req,res,next)=>{

    try{
    //check error
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success:false,errors:errors.array()})
    }

    //get all fields
    const {name,description,price,category,subcategory,sizes,bestseller}=req.body;

    //check all image 
    if (!req.files || !req.files.image1 || !req.files.image2 || !req.files.image3 || !req.files.image4) {
        return res.status(400).json({ success: false, message: 'All four images are required.' });
    }

    //get all images
     const image1 =req.files.image1 && req.files.image1[0];
     const image2 =req.files.image2 && req.files.image2[0];
     const image3 =req.files.image3 && req.files.image3[0];
     const image4 =req.files.image4 && req.files.image4[0];

     const images = [image1.filename,image2.filename,image3.filename,image4.filename];

    let ar=[sizes];
    let size=ar[0].split(",");

     //add images to cloudinary
      //const imagesUrl = await Promise.all(
    //    const imagesUrl= images.map((item)=>{
    //         try {
    //               UploadimageOncloudinary(item.path);
    //             // let result = await cloudinary.uploader.upload(item.path, { resource_type: 'auto' });
    //             // return result.secure_url;
    //         } catch (err) {
    //             console.error( err.message);
    //             throw err;
    //         }
    //     })
   //  )



     //add product to database
     const product = await productModel.create({
        name,
        description,
        price:Number(price),
        category,
        subcategory,
        sizes:size,
        bestseller:bestseller === 'true' ? true : false,
        image:images
     })

     //send success message
     res.status(200).json({success:true,message:'Add product.'})

   
    }catch(er){
        console.log(er.message);
        res.status(400).json({success:false, er})
    }   

}

module.exports.listproduct=async(req,res,next)=>{
    try {
        //list all products
        const products = await productModel.find({});
         if(!products){
             res.status(400).json({success:false,message:'products not found!'})
         }
          
         res.status(200).json({success:true,products})

    } catch (error) {
        res.status(400).json({success:false, error})
    }
}

module.exports.oneproduct=async(req,res,next)=>{
    try {
        const id = req.params.id;
        if(!id){
            res.status(400).json({success:false,message:'Id required.'})
        }
        const singleproduct = await productModel.findById(id);

        if(!singleproduct){
            res.status(400).json({success:false,message:'product not found!'})
        }
        
        res.status(200).json({success:true,singleproduct});

    } catch (error) {
        res.status(400).json({success:false,message:error.message})
    }
}

module.exports.delproduct=async(req,res,next)=>{
    try {
       const id = req.params.id;
       if(!id){
        res.status(400).json({success:false,message:'Id required.'})
        }

       const deleteproduct = await productModel.findByIdAndDelete(id);

       res.status(200).json({success:true,message:"product deleted."});

    } catch (error) {
        res.status(400).json({success:false,message:error.message})
    }
}