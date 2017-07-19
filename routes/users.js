var express = require('express');
var router = express.Router();
var userCtrl=require("../controller/userController");
var userCheck=require("../config/userCheck.js");
// console.log(userCtrl);

/* GET users listing. */
// localhost/users/
//用户users,不管是视图资源,还是ajax,都要在前面加上一个/
router.get('/reg',userCtrl.reg);
router.post('/doreg',userCtrl.doreg);
router.get('/active',userCheck,userCtrl.active);
// 用户从邮箱发起的请求
router.get('/activeok/:id',userCtrl.activeok);
router.get('/github',userCtrl.github);

router.get('/login',userCtrl.login);
router.post('/dologin',userCtrl.dologin);
router.get('/loginout',userCtrl.loginout);

// 设置信息
router.get('/setting',userCheck,userCtrl.setting);
router.post('/dosetting',userCheck,userCtrl.dosetting);

router.post('/dosetting',userCheck,userCtrl.dosetting);





module.exports = router;
