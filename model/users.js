const mongoose = require("mongoose");
var usersSchema = new mongoose.Schema({
    usersName : String,
    usersEmail : String,
    usersMobile : Number,
    usersGender : String,
    usersPassword : String,
    usersAddress : String,
});
 const usersModel = mongoose.model('users',usersSchema);
 module.exports = usersModel;