var  nodemailer=require("nodemailer");
// 定义传输协议
function set(userName,userEmail,userId){

console.log(userName,userEmail,userId);
var transport=nodemailer.createTransport({
	// 固定写法
	host:"smtp.qq.com",
	// 授权验证
	auth:{
		// 获取授权码的邮箱
		user:"348192549@qq.com",
		pass:"zgnzxbdmisjtcaah"
	}
});

// 定义传出内容
var maiOptions={
	// 发件人
	from:"xdl_conde<348192549@qq.com>",
	// 用户注册邮箱
	to:userEmail,
	// 主题
	subject:"Cnode邮箱验证",
	html:"欢迎"+userName+"注册Cnode"+"<a href='http://localhost/users/activeok/"+userId+"'>点击跳转</a>"
}
transport.sendMail(maiOptions,function(err,info){
	console.log(err);
	console.log(info);
})
};
module.exports=set;