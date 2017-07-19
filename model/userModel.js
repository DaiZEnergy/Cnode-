var mongoose=require("../config/db_config");
// console.log(mongoose);
var userSchema=new mongoose.Schema({
	uname:{
		type:String,
		unique:true
	},
	upwd:String,
	email:{
		type:String,
		unique:true
	},
	// 个性签名
	mark:{
		type:String,
		default:""
	},
	userpic:{
		// 用户头像
		type:String,
		default:""
	},
	// 金币
	gold:{
		type:Number,
		default:10
	},
	//注册时间
	regtime:{
		type:Date,
		default:new Date()
	},
	active:{
		// 验证权限
		type:Number,
		default:0
	}
	
});

var userModel=mongoose.model("cnode_user",userSchema);

module.exports=userModel;
