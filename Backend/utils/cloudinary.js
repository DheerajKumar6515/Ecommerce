const { v2 } = require('cloudinary');
const { cloudinary } = v2;

// const connectCloudinary=async()=>{
//   cloudinary.config({
//     cloud_name:process.env.CLOUDINARY_NAME,
//     api_key:process.env.CLOUDINARY_API_KEY,
//     api_secret:process.env.CLOUDINARY_SECRET_KEY
//   })

// }

// module.exports=connectCloudinary;


v2.config({
  cloud_name:process.env.CLOUDINARY_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_SECRET_KEY
});


const UploadimageOncloudinary=async(localfilepath)=>{
   try {
     if(!localfilepath) return null;

     //upload images on cloudinary
      const res=await v2.uploader.upload(localfilepath,{resource_type:'auto'});

      console.log(res.url);
       return res;
      

   } catch (error) {
     console.log(error.message);
     
   }
}

module.exports=UploadimageOncloudinary;