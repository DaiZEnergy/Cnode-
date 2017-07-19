// 1.加载fs模块
var fs=require("fs");
//2.加载gm图片处理模块
var gm=require("gm");
//3.安装软件(一次安装终身使用)GraphicsMagick;



//需求:统一,修改上传图片大小

/*gm("上传图片地址").resize(120,120).write("处理完毕存放地址",function(err){
	// 调试信息
		console.log(err);
	});*/


function resizeImg(imgSrc,imgDes,width,height,callback){
	gm(imgSrc).resize(width,height).write(imgDes,function(err){
		callback(err);
	});
}

module.exports=resizeImg;