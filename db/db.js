exports.exception = function DatabaseException(message) {
	this.message = message;
	this.name = "DatabaseException";
};

exports.insertRecipe = function(db, recipe, callbackForRecipe) {
	this.recipesCollection = this.recipesCollection || db.collection('recipes');

	this.recipesCollection.insert(recipe, callbackForRecipe);
};

exports.insertChai = function(db, chai, callbackForChai) {
	this.chaiCollection = this.chaiCollection || db.collection('chai');

	this.chaiCollection.insert(chai, callbackForChai);
};

/*This update function updates only the first match and upsert is false so it doesnt create new document when match fails*/
exports.updateChai = function(db, selector, doc, callback) {
	this.chaiCollection = this.chaiCollection || db.collection('chai');

	this.chaiCollection.update(selector, doc, callback);
};

exports.findChaiById = function(db, id, callback) {
	this.chaiCollection = this.chaiCollection || db.collection('chai');

	this.chaiCollection.findOne({
		_id: id
	}, callback);
};

/*This is to be used with get requests to paths of type /:id or /:id/:recipe where recipe 1 otherwise it is implicitly 
taken as 1 unless stated otherwise in url*/
exports.findByIdAndRecipe = function(db, id, recipe, fields, callback) {

	console.log(id + " " + recipe);
	this.recipesCollection = this.recipesCollection || db.collection('recipes');
	this.chaiCollection = this.chaiCollection || db.collection('chai');

	this.chaiCollection.findOne({
		_id: id
	}, {
		fields: {
			recipes: 1
		}
	}, function(err, doc) {
		if (err || doc === null) {

			/*returns err and undefined to callback to signify invalid chai id error*/
			callback(new Error('Invalid chai id'),undefined);
			return;
		}
		db.collection('recipes').findOne({
			_id: doc.recipes[--recipe]
		}, {
			fields: fields
		}, callback);
	});
};

exports.findLatestChai = function(db, callback) {
	this.chaiCollection = this.chaiCollection || db.collection('chai');

	this.chaiCollection.findOne({}, {
		sort: {
			_id: -1
		},
		limit: 1
	}, callback);
};