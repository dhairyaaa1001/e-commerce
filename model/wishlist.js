const mongoose = require('mongoose');
const wishlistSchema = new mongoose.Schema({
   productId : String ,
   productName : String,
   productPhoto : String,
   productPrice : Number,
   userId : {
    type : String,
    default : "1",
   },
});

const wishlistModel = mongoose.model('wishlist', wishlistSchema);
module.exports = wishlistModel;
