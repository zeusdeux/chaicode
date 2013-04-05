var nodeUtil = require('util'),
	util = require('../util/util'),
	dbUtil = require('../db/db'),
	ChaiModel = require('../models/ChaiModel.js'),
	RecipeModel = require('../models/RecipeModel.js');

exports.createAndSaveDocuments = function (html, css, js, db, req, res, next) {
	var id = null,
		new_pk = "",
		chai = new ChaiModel(),
		recipeForChai = new RecipeModel();

	dbUtil.findLatestChai(db, function(err, latestChai) {
		if (err || latestChai === null) {
			console.log(util.colors.cyan+"chaicode: info - "+util.colors.reset+"Save first recipe for chai: err -> " + err + " chai ->" + latestChai);
			console.log(util.colors.cyan+"chaicode: info - "+util.colors.reset+"Assuming db is empty and this is first recipe for chai, setting _id to 1iE");
			/*If its the first chai then make the id as 1iE (the code increments that too 1iD)*/
			id = "1iD";
		} else {
			id = latestChai._id;
		}

		if (id !== "" && typeof id !== 'undefined' && typeof id === 'string') {
			new_pk = util.generateBase62Id(id);
		} else {
			next(new Error("The chai id returned was incorrect or malformed"));
			return;
		}

		/*Setup chai for db save*/
		chai.setId(new_pk);

		/*Setup recipe for db save*/
		recipeForChai.setCreatedAt(new Date());
		recipeForChai.setModifiedAt(new Date());
		recipeForChai.setHtml(html);
		recipeForChai.setCss(css);
		recipeForChai.setJs(js);

		console.log(util.colors.cyan+"chaicode: info - "+util.colors.reset+"Recipe being written: ");
		console.log(nodeUtil.inspect(recipeForChai.getRecipeObj(), { showHidden: true, depth: null, colors: true }));

		dbUtil.insertRecipe(db, recipeForChai.getRecipeObj(), function(err, result) {

			if (err || result === null) {
				next(new Error("Failed to save first recipe for chai"));
				return;
			}

			chai.pushRecipe(result[0]._id);

			console.log(util.colors.cyan+"chaicode: info - "+util.colors.reset+"Chai Doc being written: ");
			console.log(nodeUtil.inspect(chai.getChaiObj(), { showHidden: true, depth: null, colors: true }));

			dbUtil.insertChai(db, chai.getChaiObj(), function(err, chai_results) {

				if (err || chai_results === null) {
					next(new Error("Failed to save chai"));
					return;
				}
				res.redirect("/" + chai_results[0]._id + "/" + chai_results[0].recipes.length);
			});
		});
	});
};

exports.saveNewRecipe = function (html, css, js, db, id, req, res, next) {
	var recipeForChai = new RecipeModel();
	dbUtil.findChaiById(db, id, function(err, doc) {

		/*If id doesnt exist then save the chai as a new chai*/
		/*This might happen very VERY rarely (maliciously modified manually) as the id etc in action 
		for code_form is loaded on page load to form the action url*/
		if (err || doc === null) {
			console.log(util.colors.cyan+"chaicode: info - "+util.colors.reset+"Save new recipe for chai: err -> " + err + " chai ->" + doc);
			console.log(util.colors.cyan+"chaicode: info - "+util.colors.reset+"Assuming chai id doesn't exist so storing as new chai");
			exports.createAndSaveDocuments(html, css, js, db, req, res, next);
			return;
		}

		recipeForChai.setCreatedAt(new Date());
		recipeForChai.setModifiedAt(new Date());
		recipeForChai.setHtml(html);
		recipeForChai.setCss(css);
		recipeForChai.setJs(js);

		console.log(util.colors.cyan+"chaicode: info - "+util.colors.reset+"Recipe being written: ");
		console.log(nodeUtil.inspect(recipeForChai.getRecipeObj(), { showHidden: true, depth: null, colors: true }));

		dbUtil.insertRecipe(db, recipeForChai.getRecipeObj(), function(err, result) {
			if (err || result === null) {
				next(new Error("Failed to save recipe"));
				return;
			}

			dbUtil.updateChai(db, {
				_id: id
			}, {
				$push: {
					recipes: result[0]._id
				}
			}, function(err, count) {
				console.log(util.colors.cyan+"chaicode: info - "+util.colors.reset+"Documents updated -> "+ util.colors.yellow + count + util.colors.reset + " Err -> " +util.colors.cyan+ err+util.colors.reset);
				if (err || count <= 0) {
					next(new Error("Could not update chai with new recipe"));
					return;
				}
				dbUtil.findChaiById(db, id, function(err, doc) {
					if (err || doc === null) {
						next(new Error("Could not find updated chai"));
						return;
					}
					console.log(util.colors.cyan+"chaicode: info - "+util.colors.reset+"Updated Chai doc: ");
					console.log(nodeUtil.inspect(doc, { showHidden: true, depth: null, colors: true }));

					res.redirect("/" + doc._id + "/" + doc.recipes.length);
				});
			});
		});
	});
};