const mongoose = require("mongoose");
var contactSchema = new mongoose.Schema({
    userId : {
        type : String,
        default : "1",
    },
    userName : String,
    userEmail : String,
    userMobile : Number,
    userSubject : String,
    userMessage : String,
});
 const contactModel = mongoose.model('contact',contactSchema);
 module.exports = contactModel;