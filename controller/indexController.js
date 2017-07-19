var topicModel=require("../model/topicModel");
var obj={};
obj.topic=function(req,res){

  topicModel.find().count(function(err,num){
    /*当前是在第几页*/
  var page=req.query.page?req.query.page:1;
/*  每页输出10条数据*/
  var pageSize=10;

  var pageMax=Math.ceil(num/pageSize);

  if(page<=0){
    page=1
  };
  if(page>=pageMax){
    page=pageMax
  };
  // 跳过多少条输出
  var pageOffset=(page-1)*pageSize;
	 // var type=req.query.num;
  // 第一个参数条件
  // 第二参数是控制显示
  // 条件
  // 你可以不写,但是位置要给


    topicModel.find({},{},{
      sort:{
        reTime:-1
      },
    /*  跳过多少条数据输出*/
      skip:pageOffset,
     /* 每页显示多少条*/
      limit:pageSize
    }).populate("uid",{userpic:1}).populate("lastreplyuser",{userpic:1}).exec(function(err,data){
    	console.log(data);
         res.render("index",{topicData:data,page:page,pageMax:pageMax});
    })

  })

};

module.exports=obj;