(function() {
	"use strict";

	function Util() {

	}

	Util.prototype.toBase62 = function toBase62(number, arr) {
		var list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

		if (!arguments.length)
			throw new SyntaxError("toBase62: Invalid syntax. Use toBase62(number[, Array])");

		number = parseInt(arguments[0], 10);

		if (isNaN(number))
			throw new TypeError("toBase62: First parameter needs to be a valid integer number");

		if (number < 0) {
			console.error("toBase62: Number passed is less than zero");
			console.error("toBase62: Taking its abs and moving on");
			number = Math.abs(number);
		}

		var q = Math.floor(number / 62),
			r = number % 62;

		if (!(arguments[1] instanceof Array))
			arguments[1] = arr = [];

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
	/*Dont get it? Read http://perfectionkills.com/global-eval-what-are-the-options/*/
	var global = (function() {
		return this || (1 ? eval : 0)('this');
	})();
	if (typeof global.Chaicode === "undefined") global.Chaicode = {};
	global.Chaicode.util = new Util();
})();