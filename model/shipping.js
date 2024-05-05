const mongoose = require('mongoose');
const shippingSchema = new mongoose.Schema({
   shippingNumber : Number ,
   shippingName : String,
   shippingAddress : String,
   orderId : {
    type : String,
    default : 1,
   },
   
});

const shippingModel = mongoose.model('shipping', shippingSchema);
module.exports = shippingModel;
