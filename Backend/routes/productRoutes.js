const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { body } = require('express-validator');
const upload = require('../utils/multer')
const auth = require('../middleware/auth');



router.post('/addproduct',auth,upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
]),
    body('name').isString().isLength({min:5}).withMessage('Product name must be at least 5 char'),
    body('description').isString().isLength({min:10}).withMessage('Product description must be at least 10 char'),
    body('price').isNumeric().isLength({min:1}).withMessage('Product price must be at least 1 char'),
    //body('image').isString().withMessage('Product image is required'),
    body('category').isString().isLength({min:3}).withMessage('Product category must be at least 3 char'),
    body('subcategory').isString().isLength({min:3}).withMessage('Product subcategory must be at least 3 char'),
    body('sizes').isString().isLength({min:1}).withMessage('Product sizes must be at least 1 char'),
    body('bestseller').isString().withMessage("bestseller must be at least true or false"),
    productController.addProducts
)

router.get('/Listproduct',productController.listproduct);

router.get('/singleproduct/:id',productController.oneproduct);

router.delete('/deleteproduct/:id',auth,productController.delproduct);


module.exports=router;

