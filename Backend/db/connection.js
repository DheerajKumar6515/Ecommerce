const mongoose = require('mongoose');

const DB_URL1=https://ecommerce-frontend-7p13.onrender.com;
const connectTodb = async()=>{
    try {
        await mongoose.connect(`${process.env.DB_URL1}`).then(()=>{
            console.log('connection successfully👍');          
        })
    } catch (e) {
        console.log(e.message);       
    }
}

module.exports = connectTodb
























