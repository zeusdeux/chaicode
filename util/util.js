/*
 * Contains utilities like:
 * 1)enabling code export to html
 * 2)enabling download of exported file via getFile
 * 3)converting integers to and from base 62
 * 4)creating mock errors for testing
 * 5)colors object with ANSI color coeds to be used for logging to stdout
 */

var fs = require('fs');

exports.export = function(req, res) {

	var data = "<html><head>";
	if ( !! req.body.chaiId && !! req.body.recipeNumber) {
		data += "<!-- Chaicode -->";
		data += "<!-- Chai Id: " + req.body.chaiId + " Recipe: " + req.body.recipeNumber + " -->";
	}
	data += req.body.head;
	data += "</head><body>";
	data += req.body.body;
	data += "</body></html>";

	var temp_file = fs.writeFileSync('temp.html', data, 'utf-8');
	res.end("done");
};

exports.getExportedFile = function(req, res) {
	res.download('temp.html', 'chai.html');
};

exports.notFound404 = function(req, res) {
	/*res.send(404, 'Sorry, we cannot find that!');*/
	res.statusCode = 404;
	res.render('errors/404.ejs');

};

exports.toBase62 = function toBase62(number, arr) {
	var list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

	var q = Math.floor(number / 62),
		r = number % 62;


	if (q === 0) {
		arr.push(list[r]);
		return arr.reverse().join("");
	} else {
		q = Math.floor(number / 62);
		r = number % 62;
		arr.push(list[r]);
		return toBase62(q, arr);
	}
};

exports.fromBase62ToInt = function(base62num) {
	var list = {
		0: 0,
		1: 1,
		2: 2,
		3: 3,
		4: 4,
		5: 5,
		6: 6,
		7: 7,
		8: 8,
		9: 9,
		a: 10,
		b: 11,
		c: 12,
		d: 13,
		e: 14,
		f: 15,
		g: 16,
		h: 17,
		i: 18,
		j: 19,
		k: 20,
		l: 21,
		m: 22,
		n: 23,
		o: 24,
		p: 25,
		q: 26,
		r: 27,
		s: 28,
		t: 29,
		u: 30,
		v: 31,
		w: 32,
		x: 33,
		y: 34,
		z: 35,
		A: 36,
		B: 37,
		C: 38,
		D: 39,
		E: 40,
		F: 41,
		G: 42,
		H: 43,
		I: 44,
		J: 45,
		K: 46,
		L: 47,
		M: 48,
		N: 49,
		O: 50,
		P: 51,
		Q: 52,
		R: 53,
		S: 54,
		T: 55,
		U: 56,
		V: 57,
		W: 58,
		X: 59,
		Y: 60,
		Z: 61
	},
	numArray = base62num.split("").reverse(),
		intNum = 0;

	for (var i = 0; i < numArray.length; i++) {
		intNum += list[numArray[i]] * (Math.pow(62, i));
	}

	return intNum;
};

exports.generateBase62Id = function(latestBase62Id) {
	var intId = exports.fromBase62ToInt(latestBase62Id);
	intId++;
	return exports.toBase62(intId, []);
};

/*This method is just to check how error handling works and bubbles*/
exports.createError = function() {
	var e = new Error("OMFG! Dafaq didjoo do?! o.O");
	e.stack = "? AT ?! AT WHY THE FLIP WOULD YOU DO THAT?! -.-\"";
	throw e;
};

exports.colors = {
	'red': '\u001b[31m',
	'blue': '\u001b[34m',
	'green': '\u001b[32m',
	'yellow': '\u001b[33m',
	'white': '\u001b[37m',
	'cyan': '\u001b[36m',
	'magenta': '\u001b[35m',
	'whiteBG': '\u001b[47m',
	'reset': '\u001b[0m'
};