exports = module.exports = function ChaiModel(id, user, recipes) {
	var _id = id || ''
	, 	_user = user || ''
	, 	_recipes = recipes || [];

	/*Setters*/

	this.setId = function(id) {
		_id = id;
	};

	this.setUser = function(user) {
		_user = user;
	};

	this.pushRecipe = function(recipe){
		_recipes.push(recipe);
	};

	/*Getters*/

	this.getId = function() {
		return _id;
	};

	this.getUser = function() {
		return _user;
	};

	this.getRecipes = function() {
		return _recipes;
	};

	/*Returns object of properties*/

	this.getChaiObj = function() {
		return {
			_id: _id,
			user: _user,
			recipes: _recipes
		};
	};
};