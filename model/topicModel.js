var mongoose=require("../config/db_config");
// console.log(mongoose);
var topicSchema=new mongoose.Schema({
	title:String,
	content:String,
	uid:{
		type:'ObjectId',
		ref:"cnode_user"
	},
	viewNum:{
		type:Number,
		default:1
	},
	reTime:{
		type:Date,
		default:Date.now
	},
	reply:[{
		type:"ObjectId",
		ref:"cnode_user"
	}],
	lastreplytime:{
		type:Date,
	    default:null
	},
	lastreplyuser:{
		type:"ObjectId",
		ref:"cnode_user",
	    default:null
	}
	
});
var topicModel=mongoose.model("cnode_topic",topicSchema);
module.exports=topicModel;
