const express = require('express');
const bodyParser = require('body-parser');
const adminModel = require('../model/admin');
const router = express.Router();

// Middleware for parsing request body
router.use(bodyParser.urlencoded({ extended: true }));

// Route for deleting admin by ID
router.post('/delete/:id', function(req, res, next) {
    let id = req.params.id;
    adminModel.findByIdAndDelete(id)
        .then((data) => {
            // Redirect to admin home page after deletion
            res.redirect('/admin/');
        })
        .catch((err) => console.log(err));
});

// Route for rendering admin add form
router.get('/add', function(req, res, next) {
  // Check if session is active in admin form page
  if (!req.session.email) {
    console.log("Session not active");
    res.redirect('/admin/login');
}
    res.render('admin/add-admin');
});

// Route for rendering admin registration form
router.get('/register', function(req, res, next) {
    res.render('admin/admin-register');
});

// Route for rendering admin login form
router.get('/login', function(req, res, next) {
    res.render('admin/login-admin');
});

// Route for handling admin login
router.post('/login', function(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    // Find admin by email
    adminModel.findOne({ "adminEmail": email }).then(function(dbAdmin) {
        if (dbAdmin) {
            var dbEmail = dbAdmin.adminEmail;
            var dbPassword = dbAdmin.adminPassword;
        }
        if (dbEmail == null) {
            // If email not found
            res.end("Email not found");
        } else if (dbEmail == email && dbPassword == password) {
            // If credentials match, set session and redirect to admin home
            console.log('login Successful');
            req.session.email = dbEmail;
            res.redirect('/admin/');
        } else {
            // If credentials do not match
            res.end("Credentials Does not Match");
        }
    });
});

// Route for registering new admin
router.post('/register', function(req, res, next) {
    console.log(req.body);
    const adminData = {
        adminName: req.body.name,
        adminEmail: req.body.email,
        adminAge: req.body.age,
        adminPassword: req.body.password,
    };
    // Create new admin
    adminModel.create(adminData)
        .then(() => {
            console.log("Data added")
            res.redirect('login');
        })
        .catch(() => console.log("data not added"));
});

// Route for adding new admin through a form
router.post('/adminform', function(req, res, next) {
    var adminData = {
        adminName: req.body.name,
        adminEmail: req.body.email,
        adminPassword: req.body.password,
        adminAge: req.body.age,
    };
    // Create new admin
    adminModel.create(adminData)
        .then(() => console.log('data added'))
        .catch((err) => console.log("data not added"));
    res.redirect('/admin/add');
});

// Route for rendering admin table page
router.get('/display', function(req, res, next) {
    console.log(req.session.email);
    // Check if session is active
    if (!req.session.email) {
        console.log("Session not active");
        res.redirect('/admin/login');
    }
    // Find all admins
    adminModel.find()
        .then((data) => {
            console.log(data);
            res.render('admin/display-admin', { admindata: data });
        })
        .catch((err) => console.log(err));
});
// Route for rendering Admin home page
router.get("/",function(req,res,next){
  if (!req.session.email) {
    console.log("Session not active");
    res.redirect('/admin/login');
}
  res.render('admin/dashboard');
})

// Route for rendering forgot password form
router.get('/forgotpassword', function(req, res, next) {
    res.render('admin/forgot-admin');
});

// Route for handling forgot password request
router.post('/forgotpassword', function(req, res, next) {
    var email = req.body.email;
    // Find admin by email
    adminModel.findOne({ 'adminEmail': email }).then(function(dbUser) {
        if (dbUser) {
            var email = dbUser.adminEmail;
            var password = dbUser.adminPassword;
        }
        if (dbUser.adminEmail == null) {
            // If email not found
            console.log("email not found");
            res.end("Email does not exist");
        } else {
            // Send password via email through nodemailer
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
          text:  "Your Password is " + password ,
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
    });
});
// Route for rendering change password form
router.get('/changepassword', function(req, res, next) {
  if (!req.session.email) {
    console.log("Session not active");
    res.redirect('/admin/login');
}
  res.render('admin/change-password');
});
// Route for handling change password logic
router.post('/changepassword',function(req,res,next){
  console.log(req.session.email);
  var myEmail = req.session.email;
  var oPass = req.body.oldPassword;
  var nPass = req.body.newPassword;
  var cPass = req.body.cnewPassword;
  adminModel.findOne({'adminEmail':myEmail}).then(function(dbUser){
    if(dbUser.adminPassword == oPass){
      if(nPass == oPass){
        console.log('same');
        res.end("new password cannot be same as old password");
      }
      else if(nPass==cPass){
        adminModel.findOneAndUpdate({'adminEmail':myEmail},{$set : {'adminPassword':nPass}}).then(function(){
        console.log('success');
        res.redirect("/admin/");
      })
      }
      else{
        console.log('Password not chaned');
        res.end("Password does not match");     
      }
    }
    else{
      console.log("Incorrect Current Password");
      res.end("Your current password is incorrect");
    }
  })
});
// Route for handling Logout
router.get('/logout',function(req,res,next){
  // Destroy the session
  req.session.destroy(function(err){
    if(err){
      console.log(err);
    }else {
      // Redirect to login page
      res.redirect('/admin/');
    }
  })
})

module.exports = router;
