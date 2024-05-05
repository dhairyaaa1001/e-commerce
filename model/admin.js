const mongoose = require("mongoose");
var adminSchema = new mongoose.Schema({
    adminName : String,
    adminEmail : String,
    adminPassword : String,
    adminAge : Number,
});
 const adminModel = mongoose.model('admin',adminSchema);
 module.exports = adminModel;