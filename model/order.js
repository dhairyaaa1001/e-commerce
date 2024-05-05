const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
   orderDate : Date.now ,
   userId : String,
   productId : String,
   productQuantity : {
    type : Number,
    default : 1,
   },
   price : Number ,
});

const cartModel = mongoose.model('cart', cartSchema);
module.exports = cartModel;
