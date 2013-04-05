var post = require('./post'),
	get = require('./get'),
	put = require('./put.js'),
	del = require('./delete.js'),
	all = require('./all.js'),
	util = require('../util/util');

exports = module.exports = function(app, db) {

	/*GET routes*/
	get(app,db);

	/*POST routes*/
	post(app,db);

	/*PUT routes*/
	put(app,db);

	/*DELETE routes*/
	del(app,db);

	/*ALL (app.all) routes*/
	all(app,db);

	/*404 given manually so that it is the last route.*/
	app.get('*', util.notFound404);
};