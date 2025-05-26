const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const UserController = require('../controllers/UserController')


router.post('/signup',
  body('name').isString().isLength({min:3}).withMessage('Name must be at least 3 char..'),
  body('email').isString().isLength({min:15}).withMessage('Email must be at least 15 char.'),
  body('password').isString().isLength({min:8}).withMessage('Password must be at least 8 char.'),
    UserController.createUser
)

router.post('/signIn',
  body('email').isString().isLength({min:15}).withMessage('Email must be at least 15 char.'),
  body('password').isString().isLength({min:8}).withMessage('Password must be at least 8 char.'),
  UserController.loginUser
)

router.post('/updatePassword',
  body('name').isString().isLength({min:3}).withMessage('Name must be at least 3 char..'),
  body('password').isString().isLength({min:8}).withMessage('Password must be at least 8 char.'),
  body('cfpassword').isString().isLength({min:8}).withMessage('confirm Password must be at least 8 char.'),
  UserController.updatepassword
)

router.post('/admin',
  body('email').isString().isLength({min:15}).withMessage('Email must be at least 15 char.'),
  body('password').isString().isLength({min:8}).withMessage('Password must be at least 8 char.'),
  UserController.adminLogin
)

router.get('/logout',(req,res)=>{
  res.clearCookie('token');
  res.status(200).json({success:true,message:"Logout"})
})

router.get('/adminlogout',(req,res)=>{
  res.clearCookie('admintoken');
  res.status(200).json({success:true,message:"Logout"})
})

module.exports=router