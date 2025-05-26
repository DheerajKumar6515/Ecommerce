// const multer = require('multer');

// const storage = multer.diskStorage({
//     filename:function(req,file,cb){
//         cb(null,file.originalname);
//     }
// })

// const upload = multer({storage});

// module.exports=upload

const multer=require('multer')
//const crypto=require('crypto')
//const path=require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './images')
    },
    filename: function (req, file, cb) {
        // crypto.randomBytes(12,(err,bytes)=>{
        //     const fn=bytes.toString('hex')+path.extname(file.originalname);
        //     cb(null, fn)
        //   })
        cb(null,file.originalname);
    }
  })
  
  const upload = multer({ storage: storage })

  module.exports=upload