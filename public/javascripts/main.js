(function($) {
	"use strict";
	/*Cache window.location, window, window.location.pathname, window.location.href etc*/

	/*Dont get it? Read http://perfectionkills.com/global-eval-what-are-the-options/*/
	var global = (function(){ return this || (1 ? eval : 0)('this');})();
	if (typeof global.Chaicode === 'undefined') global.Chaicode = {};

	function get_iframe_data() {
		get_iframe_data.iframe = get_iframe_data.iframe || (document.getElementsByTagName("iframe")[0]).contentWindow.document;
		get_iframe_data.pathArray = window.location.pathname.split("/");
		get_iframe_data.pathArray.length > 2 ? get_iframe_data.pathArray.splice(0,1) : get_iframe_data.pathArray;
		get_iframe_data.html = {
			"head": get_iframe_data.iframe.head.innerHTML,
			"body": get_iframe_data.iframe.body.innerHTML,
			"chaiId": get_iframe_data.pathArray[0],
			"recipeNumber": get_iframe_data.pathArray[1]
		};
	}

	function list_chais_handler(){
		$('#list_chais').click(function() {
			/*test should actually be the username. after implementing user functionality, CHANGE IT!*/
			console.log(window.location.origin+"test/list");
			window.location = window.location.origin+"/test/list";
		});
	}

	function save_handler() {
		$('#save').click(function() {
			$('#code_form').submit();
		});
	}

	function export_handler() {
		$('#export').click(function() {

			if(!confirm("Don't forget to wrap your JS code in window.onready or $(document).ready, etc and disable your popup blocker (if any).")){
				return false;
			}

			get_iframe_data();
			$.post('/export', get_iframe_data.html, function() {
				var win = window.open('http://localhost:3001/getExportedFile', 'download_window');
			});
		});
	}

	function fork_handler() {
		$('#fork').click(function() {
			var $form = $('#code_form');
			$form.attr('action', "/save");
			$form.submit();
		});
	}

	function live_scrn_handler() {
		$('#live_scrn').click(function() {

			/*Cant go live if the chai isn't saved. Fix to show error on ui and not only in console*/
			if (window.location.pathname === "/") {
				console.error(new Error("Chaicode Error: Can't go live till chai is saved atleast once.").message);
				alert("Chaicode Error: Can't go live till chai is saved atleast once.");
				return false;
			}

			live_scrn_handler.timestamp = (new Date()).getTime();
			live_scrn_handler.timestampInBase62 = Chaicode.util.toBase62(parseInt(live_scrn_handler.timestamp, 10), []);

			var pathnameArray = window.location.pathname.split("/");

			socket_join_room(pathnameArray[1] + pathnameArray[2] + live_scrn_handler.timestampInBase62);

			alert("chaicode: Goto "+window.location.href + "/" + live_scrn_handler.timestampInBase62 + "/live"+" on your devices for live updations.");
			var live_scrn_win = window.open(window.location.href + "/" + live_scrn_handler.timestampInBase62 + "/live", 'fullscreen');
		});
	}

	function collab_handler() {
		$('#collab').click(function() {
			var collab_win = window.open(window.location.href + "/live", 'fullscreen');
		});
	}

	function new_chai_handler() {
		$('#new_chai').click(function() {
			window.location = window.location.origin;
		});
	}

	function socket_connect() {
		//change the ip to the ip the socket server is running on. At work my ip is 172.16.0.94 hence it connects to that from here. If you make this
		// localhost then via other devises it wont work as their localhost is different from your localhost. Hence use ip
		socket_connect.socket = io.connect(window.location.origin);
	}

	function socket_join_room(room) {
		socket_connect.socket.emit("join", {
			"room": room
		});
		socket_join_room.room = room;

		update_socket_handler();
		socket_handlers();
	}

	function socket_send_update(data) {
		socket_connect.socket.emit("updateYourself", data);
	}

	function socket_handlers() {
		socket_connect.socket.on("joinedSuccessfully", function(msg) {
			if ( !! msg) socket_join_room.success = true;
		});
	}

	/*Handles sendUpdate event dispatched by chaicode.js when it updates the iFrame*/

	function update_socket_handler() {
		$('body').on("sendUpdate", function() {
			var data = {};
			data.html = $('#chaicode_html_content').val();
			data.js = $('#chaicode_js_content').val();
			data.css = $('#chaicode_css_content').val();

			socket_send_update(data);
		});
	}

	$(document).ready(function() {
		$('#code_form').attr('action', (window.location.pathname.length == 1 ? "" : window.location.pathname) + "/save");

		Chaicode.init();

		socket_connect();

		list_chais_handler();
		save_handler();
		export_handler();
		fork_handler();
		live_scrn_handler();
		collab_handler();
		new_chai_handler();

	});
})(jQuery);