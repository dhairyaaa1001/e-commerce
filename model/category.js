const mongoose = require("mongoose");
var categorySchema = new mongoose.Schema({
    categoryName : String,
    
});
 const categoryModel = mongoose.model('category',categorySchema);
 module.exports = categoryModel;