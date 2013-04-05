var util = require('../util/util'),
	dbUtil = require('../db/db'),
	chaiCodeHelper = require('./chaiCodeHelper'),
	html = "",
	css = "",
	js = "";

exports.index = function(req, res) {
	res.render('index.ejs', {
		html: "",
		css: "",
		js: ""
	});
};

exports.save = function(db) {
	return function(req, res, next) {

		html = req.body.chaicode.html;

		css = req.body.chaicode.css;

		js = req.body.chaicode.js;

		chaiCodeHelper.createAndSaveDocuments(html, css, js, db, req, res, next);
	};
};

exports.saveNewRecipe = function(db) {
	return function(req, res, next) {
		html = req.body.chaicode.html;

		css = req.body.chaicode.css;

		js = req.body.chaicode.js;

		chaiCodeHelper.saveNewRecipe(html, css, js, db, req.params.id, req, res, next);
	};
};

exports.show = function(db) {
	return function(req, res, next) {
		dbUtil.findByIdAndRecipe(db, req.params.id, req.params.recipe, {
			html: 1,
			css: 1,
			js: 1
		}, function(err, doc) {
			if (err || doc === null) {

				/*When error is thrown from db.js, doc is set to undefined not null. Hence this bit skips\
				and err is set to the error that was thrown from the db.js method. This condition is met only
				if the chai id was valid and recipe was invalid as when recipe is invalid, the callback 
				will have err and doc as null. */
				if (doc === null) {
					err = new Error("Specified recipe of the chai does not exist.");
				}

				/*Since I am passing null as the 1st parameter to next, the err param in the errorHandler()
				gets set to null meaning no error occured and thus goes onto execute the controller
				for the next matching route definition which in this case is app.get('*', util.notFound404);
				thus returning a 404 page.*/
				//next(null);

				/*I am using this as I'm throwing error objects from db.js in case of error. If no error is thrown from 
				db.js and the error is thrown above then also we'll have a populated err obj. This forwards it to the error
				handler middleware*/
				next(err);

				/*Here I pass an new Error object to next(). Thus, the errorHandler() given in app.use is invoked.
				It is the default handler given by Express. You can write your own error handling function 
				by defining it to have 4 parameters, function (err, req, res, next).
				Since I pass an error object here, Express throws up a nice stack trace too.*/
				//next(new Error("Invalid qckMeddlr ID or recipe."));

				/*Here I am just passing a string. The express error handler just prints this string after 500(default error code).
				No stack trace is printed as there is no object holding the stacktrace.*/
				//next("Invalid qckMeddlr id or chai recipe.");

				/*return otherwise the following res.render also gets called.*/
				return;
			}
			res.render('index', {
				html: doc.html,
				css: doc.css,
				js: doc.js
			});
		});
	};
};

exports.liveScreen = function(db) {
	return function(req, res, next) {
		dbUtil.findByIdAndRecipe(db, req.params.id, req.params.recipe, {
			html: 1,
			css: 1,
			js: 1
		}, function(err, doc) {
			if (err || doc === null) {
				if (doc === null) {
					err = new Error("Specified recipe of the chai does not exist.");
				}
				next(err);
				return;
			}
			res.render('live', {
				html: doc.html,
				css: doc.css,
				js: doc.js
			});
		});
	};
};