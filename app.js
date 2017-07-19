var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var flash=require('connect-flash');

var index = require('./routes/index');
var users = require('./routes/users');
var topic = require('./routes/topic');
//引入时间js
var getT= require('./config/langlangAgo');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set("view engine","html");
app.engine(".html",require("ejs").__express);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
	// 密钥随机子串
	secret:"dfghhgfdsdfghjklkjhgfd",
	resave:true,//是指每次请求,重新设置session
	rolling:true,//每次请求都重新设置cookie默认是false
	saveUninitialized:false,
	// 不管是否设置 cookie,session,是否重新设置 false
	cookie:{
		maxAge:1000*60*60
	}
	}));


app.use(flash());
app.use(function(req,res,next){
	res.locals.errMsg=req.flash("errMsg");
	res.locals.user=req.session.user;
	 res.locals.getTime=getT;
	next();
});
app.use('/', index);
app.use('/users',users);
app.use('/topic',topic);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;

  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
