var express = require('express');
const productModel = require('../model/product');
const usersModel = require('../model/users');
const cartModel = require('../model/cart');
const shippingModel = require('../model/shipping');
const wishlistModel = require('../model/wishlist');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(req.session.email);
  res.render('userside/home',{email : req.session.email});
});

router.get('/about', function (req, res, next) {
  res.render('userside/about');
});

router.get('/payment', function (req, res, next) {
  res.render('userside/payment');
});
router.get('/cart',function(req,res,next){
  cartModel.find().then((data)=>{
    res.render("userside/cart",{cartData : data});
  })
  });
router.get('/contact', function (req, res, next) {
  res.render('userside/contact');
});
// Get Register Page
router.get('/register', function (req, res, next) {
  res.render('userside/register');
});
// Get Shipping Page
router.get('/ship', function (req, res, next) {
  res.render('userside/shipping');
});
// Register page post logic in users.js
// Get Login Page
router.get('/login', function (req, res, next) {
  res.render('userside/login');
});
// Login Page Login
router.post('/login', function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  usersModel.findOne({ "usersEmail": email }).then(function (dbUsers) {
    if (dbUsers) {
      var dbEmail = dbUsers.usersEmail;
      var dbPassword = dbUsers.usersPassword;
    }
    if (dbEmail == null) {
      res.end("Email not found");
    }
    else if (dbEmail == email && dbPassword == password) {
      console.log('login Successful');
      req.session.email = dbEmail;
      res.redirect('/userside/',{email:req.session.email});
    }
    else {
      res.end("Credentials Does not Match");
    }
  })
});
// Get Product Page
router.get('/product', function (req, res, next) {
  productModel.find()
    .then((data) => {
      console.log('working properly');
      res.render('userside/product', { productData: data });
    })
});
// Get Forgotpassword PAge
router.get('/forgotpassword', function (req, res, next) {
  res.render('userside/forgotpassword');
});
//--------> Logic for forgot password
router.post('/forgotpassword', function (req, res, next) {
  var email = req.body.email;
  console.log(email);
  usersModel.findOne({ 'usersEmail': email }).then(function (dbUser) {
    if (dbUser) {
      var email = dbUser.usersEmail;
      var password = dbUser.usersPassword;
    }
    if (dbUser.usersEmail == null) {
      console.log("email not found");
      res.end("Email does not exist");
    }
    else {
      "use strict";
      const nodemailer = require("nodemailer");

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: process.env.EMAIL_USER, // Use environment variables for sensitive data
          pass: process.env.EMAIL_PASS,
        },
      });

      // async..await is not allowed in global scope, must use a wrapper
      async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: 'mynamedhairya@gmail.com', // sender address
          to: email, // list of receivers
          subject: "Forgot Password", // Subject line
          text: "Your Password is " + password,
          html: "Your Password is " + password, // html body
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
      res.end("Password sent on email");
    }
  })

});

//Product details page get
router.get('/show/:id', function (req, res, next) {
  console.log("Show id get method working properly");
  console.log(req.params.id);
  productModel.findById(req.params.id).then(function (db_user_array) {
    //console.log(db_user_array);
    res.render('userside/product-details', { productData: db_user_array });
  });
});
// Get Feedback Form
router.get('/feedback', function (req, res, next) {
  res.render('userside/feedback');
});

// Add to cart functionality
router.post('/addToCart',function(req,res,next){
  //console.log(req.body.name);
  productModel.findById(req.body.id).then(function(productData){
    console.log(productData);
    var quantity = req.body.quantity;
    if(quantity==0){
      quantity=1;
    }
    var cartData = {
      productId : req.body.id,
      productQuantity : quantity,
      totalValue : req.body.price * quantity,
      productName : productData.productName,
      productPhoto : productData.productPhoto,
      userId : 1,
  }
  cartModel.create(cartData)
  .then(()=>console.log(""))
  .catch((err)=>console.log(err));
    res.redirect('/userside/cart');
  });
});
// Route for showing the wishlist
router.get('/wishlist',function(req,res,next){
  
  wishlistModel.find().then((data)=>{
    console.log("Wiahlist page rendered successfully")
    res.render('userside/wishlist',{wishlistData : data});
  })
  
})
// ROute  for adding product to wishlist
router.post('/wishlist',function(req,res,next){
  //console.log(req.body.name);
  productModel.findById(req.body.id).then(function(productData){
    console.log(productData);
    var wishlistData = {
      productId : req.body.id,
      productName : productData.productName,
      productPhoto : productData.productPhoto,
      productPrice : productData.productPrice,
      userId : 1,
  }
  wishlistModel.create(wishlistData)
  .then(()=>console.log(""))
  .catch((err)=>console.log(err));
    res.redirect('/userside/product');
  });
});
// Shipping Post method
router.post('/shippingForm',function(req,res,next){
  //console.log(req.body.name);
    
    var shipData = {
      shippingName : req.body.name,
      shippingNumber : req.body.mobile,
      shippingAddress : req.body.address,
      
  }
  shippingModel.create(shipData)
  .then(()=>console.log(""))
  .catch((err)=>console.log(err));
    res.redirect('/userside/order');
  }); 
  // Route to get place order page
 
 
module.exports = router;
