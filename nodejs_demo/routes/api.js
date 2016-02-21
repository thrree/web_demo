var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	var query_str = "{";
	for (var key in req.query){
		query_str += '  ' + key + ' : ' + req.query[key] + ', \n'
	}
	query_str += '}'
	res.send('api'+'<p>'+query_str+'</p>');
});

module.exports = router;
