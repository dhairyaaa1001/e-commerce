const mongoose = require('mongoose');
var productSchema = new mongoose.Schema({
    productName : String,
    productDetail : String,
    productPrice : String,
    productCategory : String,
    productPhoto : String,
});
 const productModel = mongoose.model('product',productSchema);
 module.exports = productModel;