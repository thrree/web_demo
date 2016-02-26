var express = require('express');
var path = require('path');
var router = express.Router();
/* GET login listing. */
router.get('/', function(req, res, next) {
	if(req.session.user) {
		res.redirect('/');
	} else {
		res.render('login', {username:""});
	}
});

router.post('/', function(req, res, next) {
	// console.log(req.body);
	Login(req.body.name, req.body.pwd, (user, err_msg) =>{
		if (!err_msg){
			// 登陆成功
			req.session.user = user;
			res.redirect(req.session.last_url || '/');
			req.session.last_url = null;
		}else{
			res.render('login', {
				err_msg : err_msg,
				username : req.body.name || "",
			});
		}		
	});

});

function Login(username, password, callback){
	var module_name = path.join(path.resolve(), './config/login.js');
	delete require.cache[module_name];
	var cfg = require(module_name);
	if (cfg[username] == password){
		// 登陆成功
		User(username, (user) => {
			callback(user);
		});
	}else{
		// 登陆失败
		callback(null, "账号/密码错误")
	}
}

// 获取user对象
function User(username, callback){
	var module_name = path.join(path.resolve() , './config/users.js');
	delete require.cache[module_name];
	var cfg = require(module_name);
	callback(cfg[username] || cfg.default);
}

module.exports = router;
