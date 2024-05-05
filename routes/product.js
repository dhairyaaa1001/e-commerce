var express = require('express');
const productModel = require('../model/product');
var router = express.Router();

/* GET home page. */
router.post('/delete/:id',function(req,res,next){
  let id = req.params.id;
  productModel.findByIdAndDelete(id)
  .then((data)=>{
  res.redirect('/product/')})
  .catch((err)=>console.log(err))
});
// Get Edit Page

router.get('/', function(req, res, next) {
    productModel.find()
    .then((data)=>{
      //console.log(data)
      res.render('product/display-product',{productData:data});  
    })
    .catch((err)=>console.log(err));
});
router.get('/add', function(req, res, next) {
    res.render('product/add-product');
  });
router.post('/productform',function(req,res,next){
    console.log("ROute successfull---------------------------------");
    console.log(req.body.name);
    let filename = req.files.photo.name;
    var productData = {
        productName:req.body.name,
        productDetail:req.body.detail,
        productPrice:req.body.price,
        productCategory:req.body.category,
        productPhoto : filename,

    }
    var photo = req.files.photo;
    productModel.create(productData)
    .then(()=>console.log("data added"))
    .catch((err)=>console.log("data not added"))
    photo.mv('public/product/upload/'+filename,function(err){
      res.redirect('/product/add');
    })
    
    
});
router.get('/edit/:id', function (req, res) {
  console.log(req.params.id);
  //res.render('users/edit-user', { userData: db_users_array });
   var id  = req.params.id;
   productModel.findById(id).then(function(userArray){
    console.log("Check point 1");
    res.render('product/edit-product', { productData: userArray });
   })
   .catch((err)=>console.log("Check POint 2")); 
});

// POst method of edit form
router.post('/edit/:id', async function (req, res) {
  console.log("Edit ID is" + req.params.id);
  let filename = req.files.photo.name;
  const mybodydata = {
    productName : req.body.name,
    productDetail : req.body.detail,
    productPrice : req.body.price,
    productCategory : req.body.category,
    productPhoto : filename,
  };
  var photo = req.files.photo;

  try {
    await productModel.findByIdAndUpdate(req.params.id, mybodydata);
    photo.mv('public/product/upload/'+filename,function(err){
    })
    res.redirect('/product/');
  } catch (err) {
    console.log("Error in Record Update", err);
    res.redirect('/product/');
  }
});

module.exports = router;
