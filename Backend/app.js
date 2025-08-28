require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path')
const UserRoutes=require('./routes/userRoutes');
const ProducrRoutes = require('./routes/productRoutes');
const connectTodb = require('./db/connection');
const cookieParser = require('cookie-parser')
const CartRoutes =require('./routes/cartRoutes');
const OrderRoutes = require('./routes/orderRoutes');
//const connectCloudinary = require('./utils/cloudinary').default


connectTodb();
//connectCloudinary();

//middleware
app.use(cors({
   // origin:process.env.port,
   // credentials:true
}))

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'images')));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

//routes

app.use('/api/users',UserRoutes);

app.use('/api/products',ProducrRoutes);

app.use('/api/cart',CartRoutes);

app.use('/api/order',OrderRoutes);

module.exports = app;
