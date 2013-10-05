/******************************************************************************************************

Author : Mudit Ameta
Link   : http://experiments.muditameta.com/qckMeddler/

License: GNU General Public License, version 3 (GPL-3.0) 
Link   : http://opensource.org/licenses/gpl-3.0.html

******************************************************************************************************/
(function() {
	"use strict";
	/*Dont get it? Read http://perfectionkills.com/global-eval-what-are-the-options/*/
	var global = (function() {
		return this || (1, eval)('this');
	})();
	if (typeof global.Chaicode === "undefined") global.Chaicode = {};
	global.Chaicode.init = function() {

		//caching required DOM references
		__live_updater.iframe = document.getElementsByTagName('iframe')[0].contentWindow.document;
		__live_updater.iframe_head = (__live_updater.iframe).getElementsByTagName('head')[0];
		__live_updater.iframe_body = (__live_updater.iframe).getElementsByTagName('body')[0];
		__live_updater.update_event = document.createEvent('Event');
		__live_updater.update_event.initEvent("sendUpdate", true, true);

		//append style tag to hold custom styles
		__live_updater.iframe_style = (__live_updater.iframe_head).appendChild((__live_updater.iframe).createElement('style'));

		//append jQuery
		var jquery_script = (__live_updater.iframe).createElement('script');
		jquery_script.src = "http://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js";
		(__live_updater.iframe_head).appendChild(jquery_script);

		//append script tag to hold custom javascript code
		__live_updater.iframe_script = (__live_updater.iframe_head).appendChild((__live_updater.iframe).createElement('script'));

		/*Fires a keyup event on textarea to load meddle data into output box after the iframe has 
		finished loading ALL its resource and parsing.*/
		var iframe_readyState_timer = window.setInterval(function() {
			if (__live_updater.iframe.readyState === "complete") {
				window.clearInterval(iframe_readyState_timer);
				console.log("iframe readyState complete");

				$('textarea').keyup(function(e) {
					if (!(e.keyCode >= 9 && e.keyCode <= 45) && !(e.keyCode >= 112 && e.keyCode <= 145)) {
						__live_updater($(this));
					}
				});
				$('textarea').keydown(function(e) {
					if (e.keyCode == 9) { //tab pressed
						e.preventDefault(); // stops its action
					}
				});

				$('textarea').keyup();
			}
		}, 100);

	};

	function __live_updater(t) {
		var css_content = $('#chaicode_css_content').val(),
			js_content = $('#chaicode_js_content').val(),
			html_content = $('#chaicode_html_content').val(),
			code_type = t.data('code');

		//insert html before appeanding javascript or jQuery ready won't fire correctly
		(__live_updater.iframe_body).innerHTML = html_content;

		//insert custom javascript
		(__live_updater.iframe_head).removeChild(__live_updater.iframe_script);
		__live_updater.iframe_script = (__live_updater.iframe_head).appendChild((__live_updater.iframe).createElement('script'));

		(__live_updater.iframe_script).textContent = '//<![CDATA[' + "\n" + js_content + "\n" + '//]]>';

		//insert css content
		(__live_updater.iframe_style).textContent = css_content;

		/*dispatch "sendUpdate" event to inform socket code to update full screen live view*/
		document.getElementsByTagName('body')[0].dispatchEvent(__live_updater.update_event);

	}
})();