var express = require('express');
const usersModel = require('../model/users');
const feedbackModel = require('../model/feedback');
const contactModel = require('../model/contact');
var router = express.Router();

/* GET users listing. */
router.post('/delete/:id',function(req,res,next){
  let id = req.params.id;
  usersModel.findByIdAndDelete(id)
  .then((data)=>{
  res.redirect('/users/')})
  .catch((err)=>console.log(err))
});
router.post('/contact/delete/:id',function(req,res,next){
  console.log("contact delete checkpoint")
  let id = req.params.id;
  contactModel.findByIdAndDelete(id)
  .then((data)=>{
  res.redirect('/users/contact')})
  .catch((err)=>console.log(err))
});
router.post('/feedback/delete/:id',function(req,res,next){
  let id = req.params.id;
  feedbackModel.findByIdAndDelete(id)
  .then((data)=>{
  res.redirect('/users/feedback')})
  .catch((err)=>console.log(err))
})
router.get('/', function(req, res, next) {
  usersModel.find()
  .then((data)=>{
    console.log(data)
    res.render('users/display-user',{usersData:data});
  })
  .catch((err)=>console.log(err));
});
router.get('/contact', function(req, res, next) {
  contactModel.find()
  .then((data)=>{
    console.log(data)
    res.render('users/contact-display',{contactData:data});
  })
  .catch((err)=>console.log(err));
});
router.get('/add', function(req, res, next) {
  res.render('users/add-user');
});
router.post('/usersform',function(req,res,next){
  //console.log(req.body.name);
  var usersData = {
    usersName : req.body.name,
    usersEmail : req.body.email,
    usersMobile : req.body.mobile,
    usersGender : req.body.gender,
    usersPassword : req.body.password,
    usersAddress : req.body.address,

}
usersModel.create(usersData)
.then(()=>console.log("data added"))
.catch((err)=>console.log("data not added"))
res.redirect('/users/add');
})
router.post('/registerform',function(req,res,next){
  //console.log(req.body.name);
  var usersData = {
    usersName : req.body.name,
    usersEmail : req.body.email,
    usersMobile : req.body.mobile,
    usersGender : req.body.gender,
    usersPassword : req.body.password,
    usersAddress : req.body.address,

}
usersModel.create(usersData)
.then(()=>console.log("data added"))
.catch((err)=>console.log("data not added"))
res.redirect('/userside/login');
});
// Storing of cobntact data to database
router.post('/contactForm',function(req,res,next){
  //console.log(req.body.name);
  var contactData = {
    userName : req.body.name,
    userEmail : req.body.email,
    userMobile : req.body.mobile,
    userSubject : req.body.subject,
    userMessage : req.body.message,

}
// Email to admin Logic starts here
"use strict";
      const nodemailer = require("nodemailer");
      
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: "mynamedhairya@gmail.com",
          pass: "hlrh hykj owde gpbp",
        },
      });
      
      // async..await is not allowed in global scope, must use a wrapper
      async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: 'mynamedhairya@gmail.com', // sender address
          to: 'mynamedhairya@gmail.com', // list of receivers
          subject: "User Contact", // Subject line
          text: "",
          html: "User Name : " + req.body.name + "<br>User Email : " 
          + req.body.email + "<br>User Mobile No. : " + req.body.mobile +
          "<br>Subject : " + req.body.subject + "<br>User Message : " + req.body.message ,// html body
        });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
        //
        // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
        //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
        //       <https://github.com/forwardemail/preview-email>
        //
      }
      
      main().catch(console.error); 
// Email to admin Logic ends here
contactModel.create(contactData)
.then(()=>console.log("data added"))
.catch((err)=>console.log("data not added"))

res.redirect('/userside/contact');
});
// Display feedback form
router.get('/feedback', function(req, res, next) {
  console.log("----------------------");
  console.log(1);
  feedbackModel.find()
  .then((data)=>{
    console.log(data)
    res.render('users/display-feedback',{feedbackData:data});
  })
  .catch((err)=>console.log(err));
});
// Feedback form post method
router.post('/feedbackform',function(req,res,next){
  //console.log(req.body.name);
  var feedbackData = {
    feedbackUserName : req.body.name,
    feedbackUserEmail : req.body.email,
    feedbackDetails : req.body.detail,

}
feedbackModel.create(feedbackData)
.then(()=>console.log("data added"))
.catch((err)=>console.log("data not added"))
res.redirect('/users/feedback');
});

// Get Edit Form
router.get('/edit/:id', function (req, res) {
  console.log(req.params.id);
  //res.render('users/edit-user', { userData: db_users_array });
   var id  = req.params.id;
   usersModel.findById(id).then(function(userArray){
    console.log("Check point 1");
    res.render('users/edit-user', { userData: userArray });
   })
   .catch((err)=>console.log("Check POint 2")); 
});

// POst method of edit form
router.post('/edit/:id', async function (req, res) {
  console.log("Edit ID is" + req.params.id);
  const mybodydata = {
    usersName : req.body.name,
    usersEmail : req.body.email,
    usersMobile : req.body.mobile,
    usersGender : req.body.gender,
    usersPassword : req.body.password,
    usersAddress : req.body.address,
  };

  try {
    await usersModel.findByIdAndUpdate(req.params.id, mybodydata);
    res.redirect('/users/');
  } catch (err) {
    console.log("Error in Record Update", err);
    res.redirect('/users/');
  }
});


module.exports = router;
