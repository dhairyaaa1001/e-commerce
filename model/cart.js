const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
   productId : String ,
   productName : String,
   productPhoto : String,
   productQuantity : {
    type : Number,
    default : 1,
   },
   totalValue : Number ,
   userId : String,
});

const cartModel = mongoose.model('cart', cartSchema);
module.exports = cartModel;
