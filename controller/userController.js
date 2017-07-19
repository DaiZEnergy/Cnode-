var userModel=require("../model/userModel");
var emailTest=require("../config/email_config.js");
var fileUpload=require("../config/file_upload.js");
var resizeImg=require("../config/setimg_config.js");
// console.log(fileUpload);
// console.log(emailTest);
// console.log(userModel);
var obj={};

obj.reg= function(req, res, next) {
  res.render("home/reg");
};

obj.github=function(req,res){
  res.render("home/dogithub");
}
obj.doreg=function(req, res, next) {
	var con={
		uname:req.body.uname
	};
	userModel.findOne(con,function(err,data){
    console.log(data);
    // 有数据是obj,没有数据null
    if(data){
      req.flash("errMsg","用户名重复");
      res.redirect("/users/reg");
      return;
    }else{
      if(req.body.pwdtest===req.body.upwd){
          userModel.create(req.body,function(err,info){
            if(err){console.log(err)}
              // console.log(info);
              emailTest(info.uname,info.email,info._id);
              res.redirect("/users/active");
              return;
          })
      }else{
          req.flash("errMsg","密码不一致");
          res.redirect("/users/reg");
          return;
      }
     
   
    }
  })
  // console.log(req.body);
  // { uname: '12345',
  // pwdtest: '12345',
  // upwd: '2345',
  // email: '12345',
  // signature: '1234' }

  // res.send("OK");
}
obj.active=function(req,res){
  res.render("home/active",{info:"验证邮件已经发送"});
}
obj.activeok=function(req,res){
  var con={
    _id:req.params.id
  }

 userModel.update(con,{$set:{active:1}},function(err,data){
    if(err){console.log(err);return}
 })
 console.log(con);
  res.redirect("/users/login");
}


obj.login=function(req,res){
  res.render("home/login");
}
obj.dologin=function(req,res){
  // console.log(req.body);
  var con={
    uname:req.body.uname
  }
    console.log(con)
  userModel.find(con,function(err,data){
    // console.log(data);   [{}]
    if(data.length===0){
        req.flash("errMsg","账号不存在");
         res.redirect("/users/login");
          return;
    }else{
     if(req.body.upwd===data[0].upwd){
        req.session.user=data[0];
        res.redirect("/");
        return;
      }else{
          req.flash("errMsg","密码错误");
          res.redirect("/users/login");
          return;
      }
    }
          // console.log(data);
  });


}

obj.loginout=function(req,res){
  req.session.user=null;
  res.redirect("/");
}



obj.setting=function(req,res){
  res.render("home/setting");
}
obj.dosetting=function(req,res){
  var con={
    _id:req.session.user._id
  };

var fileUp=fileUpload("file_upload","public/uploads");
// console.log(fileUp);
  // console.log(fileUpload);
  // 设置上传文件表单在fileUp函数调用外面req.body去不到
  fileUp(req,res,function(err){
    if(err){
            switch(err.code){
              case "类型不对":
              req.flash("errMsg","密码错误");
              res.redirect("/users/setting");
              return;
              break;
            }
          }

    // 表单数据
    // console.log(req.body);
    // { uname: 'Msea', email: '348192549@qq.com', mark: 'asdfghjkjlk' }

    //文件数据
    // console.log(req.file);
/*{ fieldname: 'file_upload',
  originalname: '1.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  destination: 'public/uploads',
  filename: '1234567890.jpg',
  path: 'public\\uploads\\1234567890.jpg',
  size: 46051 }*/
  var newData={
      mark:req.body.mark
    };
    if(req.file){
      // 图片上传成功
      resizeImg(req.file.path,req.file.path,120,120,function(err){
        // console.log(err);
        if(!err){
          // 如果有文件,这添加一个key
          newData.userpic=req.file.filename;
          userModel.update(con,newData,function(err){
            // console.log(err);
            if(!err){
              userModel.findOne(con,function(err,data){
                req.session.user=data;
                // 从哪来回啦去,固定写法
                res.redirect("back");

              })
            }    
          })
        }
      })
    }else{

      userModel.update(con,newData,function(err){
        if(!err){
          userModel.findOne(con,function(err,data){
                req.session.user=data;
                res.redirect("back");
              })
        }
      })
    }
    })//fileUp结束
  };


  // console.log(req.body);
  // // res.render("home/setting");
  // res.send("PK")
// }
module.exports=obj;