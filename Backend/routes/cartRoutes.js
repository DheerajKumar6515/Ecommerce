const express = require('express');
const router = express.Router();
const cartController =require('../controllers/cartController')
const userauth =require('../middleware/userauth');

//add cart data to database
router.post('/add',userauth,cartController.addcartItem)

router.get('/cartdata',userauth,cartController.getUsercart)

router.post('/update',userauth,cartController.Updatecart)


module.exports =router;
