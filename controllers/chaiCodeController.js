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

exports.getAllChais = function(db) {
	return function(req, res, next) {
		dbUtil.findChaisByUser(db, ""/*req.params.user*/, function(err, docs) {
			req.chais = [];
			console.log(res.on.toString());
			if (err || docs === null || docs.length === 0) {
				/*When error is thrown from db.js, docs is set to undefined not null. Hence this bit skips
				and err is set to the error that was thrown from the db.js method. */
				if (docs === null || docs.length === 0) {
					err = new Error("No chais by user.");
				}
				next(err);
				return;
			}
			/*this var keeps track of how many times the findByIdAndRecipe callback executes.
			We need this to call next only after findByIdAndRecipe is called for every doc
			given by findChaisByUser*/
			var temp = 0;
			docs.forEach(function(val, index) {
				req.chais[index] = {};
				req.chais[index]["id"] = val._id;
				req.chais[index]["revisionCount"] = val.recipes.length;
				/*Get the latest recipe for each chai*/
				dbUtil.findByIdAndRecipe(db, val._id, val.recipes.length, {
					html: 1,
					css: 1,
					js: 1
				}, function(err, doc) {
					temp++;
					console.log(temp);
					if (err || doc === null) {

						/*When error is thrown from db.js, doc is set to undefined not null. Hence this bit skips
						and err is set to the error that was thrown from the db.js method. This condition is met only
						if the chai id was valid and recipe was invalid as when recipe is invalid, the callback 
						will have err and doc as null. */
						if (doc === null) {
							err = new Error("Specified recipe of the chai does not exist.");
						}
						next(err);
						//throw err;
						return;
					}
					req.chais[index]["html"] = doc.html;
					req.chais[index]["css"] = doc.css;
					req.chais[index]["js"] = doc.js;

					if (temp === docs.length){
						req.chais.reverse();
						/*To call the next handler for the request to /:user/list*/
						next();
					}
				});
			});
		});
	};
};

exports.listAllChais = function(req, res, next){
	console.log(req.chais);
	res.render('chaisList.ejs', {results: req.chais});
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

				/*When error is thrown from db.js, doc is set to undefined not null. Hence this bit skips
				and err is set to the error that was thrown from the db.js method. This condition is met only
				if the chai id was valid and recipe was invalid as when recipe is invalid, the callback 
				will have err and doc as null. */
				if (doc === null) {
					err = new Error("Specified recipe of the chai does not exist.");
				}
				next(err);
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