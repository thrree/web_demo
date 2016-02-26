var express = require('express');
var util = require('util');
var path = require('path');
var htmlencode = require('htmlencode');
var Python = require(path.join(path.resolve(), './python'));
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	var cmd = req.query.cmd;
	if (!cmd){
		return res.send('error');
	}
	Python(cmd, (output_list) => {
		output_list.forEach(
			(each) => {
				each.content = htmlencode.htmlEncode(each.content).replace(/ /g, '&ensp;');
			});
		res.render('output',{
			title : cmd,
			output_list : output_list
		})
	});

});


module.exports = router;
