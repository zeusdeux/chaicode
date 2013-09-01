(function() {
	"use strict";
	function Util() {

	}

	Util.prototype.toBase62 = function toBase62(number, arr) {
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
	/*Dont get it? Read http://perfectionkills.com/global-eval-what-are-the-options/*/
	var global = (function(){ return this || (1 ? eval : 0)('this')})();
	if (typeof global.Chaicode === "undefined") global.Chaicode = {};
	global.Chaicode.util = new Util();
})();