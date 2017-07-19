var path=require("path");
var multer=require("multer");
/*时间模块*/
var timeStamp=require("time-stamp");
/*随机字符串模块*/
var uid=require("uid");

function uploadFile(fileName,savePath){
// console.log(fileName,savePath);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, savePath)
  },
  filename: function (req, file, cb) {
    var ext=path.extname(file.originalname);
    // cb(null,编辑文件名);
    var fileN=timeStamp('YYYYMMDD')+timeStamp('HHmmssms')+uid(10)+ext;
    cb(null,fileN);
  }
})
// 3.设置过滤

function fileFilter (req, file, cb) {

  //   cb(null, false)拒绝这个文件，使用`false`, 像这样,反之
    var allowType=['image/jpeg','image/png','image/gif'];
    console.log(file);
    // 在 file下面取到  mimetype: 'image/jpeg'
    if(allowType.indexOf(file.mimetype)==-1){
      console.log("类型不对");

      var error=new Error();
      error.code="类型不对";
      cb(error);

      cb(null,false);
    }else{
      console.log("上传成功");
      cb(null,true);
    }

}



// 配置区要写在下面
var upload=multer({
	//配置(上传路径,文件名)
	 storage: storage,
   //设置过滤
    fileFilter: fileFilter,
    // 系统提供几个过滤api
    limits:{
      // b字节    1024*30   =30kb
       fileSize:1024*300
    }
    

}).single(fileName);

return upload;
}

module.exports=uploadFile;




/*
  */




