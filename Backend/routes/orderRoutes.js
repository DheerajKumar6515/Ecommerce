const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userauth = require('../middleware/userauth');
const orderContoller = require('../controllers/orderController');


//placing orders using COD method
router.post('/codorder',userauth,orderContoller.CodOrder);

router.post('/stripeorder',userauth,orderContoller.StripeOrder);

router.post('/razerorder',userauth,orderContoller.RazerOrder);

router.get('/allorder',userauth,orderContoller.Allorder);

router.get('/list',auth,orderContoller.Orderlist);

router.post('/status',auth,orderContoller.Updatestatus);

//verifyRazorpay payment
 router.post('/verifyrazorpay',userauth,orderContoller.verifyRazorpay)


module.exports=router