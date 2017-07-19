var mongoose=require("../config/db_config");
// console.log(mongoose);
var replySchema=new mongoose.Schema({
	// 回复内容
	content:String,
	//当前登录用户ID
	uid:{
		type:'ObjectId',
		ref:"cnode_user"
	},
	//当前话题ID
	tid:{
		type:'ObjectId',
		ref:"cnode_topic"
	},
	reTime:{
		type:Date,
		default:Date.now
	},
	lou:Number
});

var replyModel=mongoose.model("cnode_reply",replySchema,"cnode_reply");

module.exports=replyModel;
