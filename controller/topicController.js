var userModel=require("../model/userModel");
var topicModel=require("../model/topicModel");
var replyModel=require("../model/replyModel");

//事件深度回调
var Eventproxy = require("eventproxy");
var ep= new Eventproxy();
var obj={};

obj.create= function(req, res, next) {
  res.render("home/topicCreate");
};
obj.docreate= function(req, res, next) {
  // console.log(req.body);
  var con={
    title:req.body.title,
    content:req.body.content,
    uid:req.session.user._id,
  }
// console.log(con);
topicModel.create(con,function(err,info){
  if(err){console.log(err);return}
  // console.log(info);
  // info._id当前插入文档话题的id
  topicModel.update(con,function(err){
      console.log(err);
  });
  req.session.topid=info._id;
  res.redirect("/topic/show/"+info._id);

})
  // { tab: '',
  // title: '杀的时候规范化',
  // content: '<p>你好<img src="http://img.baidu.com/hi/jx2/j_0004.gif"/><img src="http://img.baidu.com/hi/jx2/j_0003.gif"/></p>' }
};
obj.show= function(req, res, next) {
  // console.log(req.params._id);
  var con1={
    _id:req.params._id
  };
  var con2={
    tid:req.params._id
  };

  ep.all("topicData","replyData","niuniu",function(topicData,replyData,niuniu){
    
  res.render("home/show",{topicData:topicData,replyData:replyData});
  })
  /*uid为当前发布话题者的id*/
  topicModel.find(con1).populate('uid',{uname:1,gold:1,mark:1}).exec(function(err,data){
        // topicData 当前话题的数据
      ep.emit("topicData",data);
  });

// 浏览量
  topicModel.update(con1,{$inc:{viewNum:1}},function(err){
      if(err){console.log(err);return;}
         ep.emit("niuniu");
  });



  replyModel.find(con2).populate('uid',{uname:1,userpic:1}).exec(function(err,data){
       ep.emit("replyData",data);    
  });
  // replyModel.find(con2,function(err,data){
  //     console.log(data);
  // })


};
obj.reply=function(req,res){
  var con={_id:req.body.tid}
   
  topicModel.findOne(con,{reply:1},function(err,rel){
    // console.log(data.length+1);
  var data={
    // 谁登陆谁回复
    uid:req.session.user._id,
    //话题ID
    tid:req.body.tid,
    //回复内容
    content:req.body.content,
    lou:rel.reply.length+1,
  };

      replyModel.create(data,function(err,info){
          if(!err){
           /* info._id是当前登录用户的id*/
           var newTopic={
            $push:{reply:info._id},
             lastreplytime:new Date(),
             lastreplyuser:req.session.user._id
           }  
           console.log(newTopic);
           topicModel.update(con,newTopic,function(err){
                 // back里面包含了,当前话题ID
                 console.log("nihao");
            if(err){console.log(err)}
            res.redirect("back");
           })
       
          }
      
      })
 })

}

module.exports=obj;