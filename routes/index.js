var express = require('express');
var router = express.Router();
var indextopic=require("../controller/indexController");
/* GET home page. */
router.get('/',indextopic.topic);
/*router.get("/",function(req,res){
 res.send("ok");
})*/
router.get('/getstart', function(req, res, next) {
  res.render('getstart', { title: 'Express' });
});
router.get('/api', function(req, res, next) {
  res.render('api', { title: 'Express' });
});
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Express' });
});
module.exports = router;
