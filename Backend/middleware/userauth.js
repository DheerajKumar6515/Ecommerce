const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

const userauth = async(req,res,next)=>{
    const authuser = req.header('Authorization');
    const tokenFromHeader = authuser && authuser.startsWith('Bearer ')? authuser.split(' ')[1]:null;
    const token = req.cookies.token || tokenFromHeader;
   
        if(!token){
            res.status(401).json({success:false,message:'No token available.'});
        }
        try {
                const decodetoken = jwt.verify(token, process.env.SECRET_KEY);
                 const user = await UserModel.findById(decodetoken.id);

                 req.user=user;
                 
                 next()
                
            } catch (err) {
                return res.status(401).json({ success: false, message: "Invalid token." });
            }
   
}

module.exports=userauth