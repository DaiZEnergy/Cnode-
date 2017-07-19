var mongoose=require("mongoose");

var dbUrl="127.0.0.1",
dbPort="27017",
dbName="cnode",
url="mongodb://"+dbUrl+":"+dbPort+"/"+dbName;


mongoose.connect(url,{useMongoClient:true},function(err){
	if(err){
		console.log("数据库连接失败");
		return;
	}else{
		console.log("数据库连接成功")
	}
})
module.exports=mongoose;

