exports = module.exports = function RecipeModel(createdAt, modefiedAt, html, css, js) {
	var _createdAt = createdAt || new Date()
	,	_modifiedAt = modefiedAt || new Date()
	,	_html = html || ''
	,	_css = css || ''
	,	_js = js || '';

	/*Setters*/

	this.setCreatedAt = function(createdAt) {
		_createdAt = createdAt;
	};

	this.setModifiedAt = function(modefiedAt) {
		_modifiedAt = modefiedAt;
	};

	this.setHtml = function(html) {
		_html = html;
	};

	this.setCss = function(css) {
		_css = css;
	};

	this.setJs = function(js) {
		_js = js;
	};

	/*Getters*/

	this.getCreatedAt = function(createdAt) {
		return _createdAt;
	};

	this.getModifiedAt = function(modefiedAt) {
		return _modifiedAt;
	};

	this.getHtml = function(html) {
		return _html;
	};

	this.getCss = function(css) {
		return _css;
	};

	this.getJs = function(js) {
		return _js;
	};

	/*Returns object of properties*/

	this.getRecipeObj = function() {
		return {
			created_at: _createdAt,
			modified_at: _modifiedAt,
			html: _html,
			css: _css,
			js: _js
		};
	};
};