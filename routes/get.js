var util = require('../util/util'),
	chaiCodeController = require('../controllers/chaiCodeController');

exports = module.exports = function(app, db){
	/*GET chaiCodeController home*/
	app.get('/', chaiCodeController.index);

	/*GET exported file of current meddle*/
	app.get('/getExportedFile', util.getExportedFile);

	/*GET meddle with id as :id and recipe as :recipe*/
	app.get('/:id/:recipe', chaiCodeController.show(db));

	/*GET for full screen meddle output with timestamp to act as socket.io chatroom*/
	app.get('/:id/:recipe/:timestamp/live', chaiCodeController.liveScreen(db));

	/*GET for full screen meddle output*/
	app.get('/:id/:recipe/live', chaiCodeController.liveScreen(db));

	/*This path is just to check how the error handling works*/
	app.get('/error', function(req, res/*, next -> optional*/){
		util.createError();
	});
};