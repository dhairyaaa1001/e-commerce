const mongoose = require("mongoose");
var feedbackSchema = new mongoose.Schema({
    feedbackUserName : String,
    feedbackUserEmail : String,
    feedbackDetails : String,
    
});
 const feedbackModel = mongoose.model('feedback',feedbackSchema);
 module.exports = feedbackModel;