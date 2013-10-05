var util = require('../util/util'),
	chaiCodeController = require('../controllers/chaiCodeController');

exports = module.exports = function(app, db) {
	/*POST to write temp file on server with current meddle*/
	app.post('/export', util.export);

	/*POST to save new meddle, 1st recipe*/
	app.post('/save', chaiCodeController.save(db));

	/*POST to save :recipe of meddle*/
	app.post('/:id/:recipe/save', chaiCodeController.saveNewRecipe(db));

	/*app.post('/:id/:recipe/delete', chaiCodeController.deleteChai);*/
};