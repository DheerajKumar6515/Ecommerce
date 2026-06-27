const mongoose = require('mongoose');

const DB_URL1="https://ecommerce-backend-9i9x.onrender.com";
const connectTodb = async()=>{
    try {
        await mongoose.connect(`${process.env.DB_URL}`).then(()=>{
            console.log('connection successfully👍');          
        })
    } catch (e) {
        console.log(e.message);       
    }
}

module.exports = connectTodb
























