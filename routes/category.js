var express = require('express');
const categoryModel = require('../model/category');
var router = express.Router();

/* GET home page. */
router.post('/delete/:id',function(req,res,next){
  let id = req.params.id;
  categoryModel.findByIdAndDelete(id)
  .then((data)=>{
  res.redirect('/category/')})
  .catch((err)=>console.log(err))
});

router.get('/', function(req, res, next) {
  categoryModel.find()
  .then((data)=>{
    console.log(data)
    res.render('category/display-category',{categoryData:data});  
  })
  .catch((err)=>console.log("err"));
  
});
router.get('/add', function(req, res, next) {
    res.render('category/add-category');
  });
router.post('/categoryform',function(req,res,next){
    //console.log(req.body.name);
    var categoryData = {
      categoryName : req.body.name,
  }
  categoryModel.create(categoryData)
  .then(()=>console.log("data added"))
  .catch((err)=>console.log("data not added"))
  res.redirect('/category/add');
  })
// GEt Edit form Paage
router.get('/edit/:id', function (req, res) {
  console.log(req.params.id);
  categoryModel.findById(req.params.id).then(function (db_users_array) {
    console.log(db_users_array);
    res.render('category/edit-category', { categoryData: db_users_array });
  });
});
// POst of edit form
router.post('/edit/:id', async function (req, res) {
  console.log("Edit ID is" + req.params.id);
  const mybodydata = {
    categoryName: req.body.name,
  };

  try {
    await categoryModel.findByIdAndUpdate(req.params.id, mybodydata);
    res.redirect('/category/');
  } catch (err) {
    console.log("Error in Record Update", err);
    res.redirect('/category/');
  }
});

module.exports = router;

