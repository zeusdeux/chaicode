(function($) {

	$(document).ready(function() {

		//change the ip to the ip the socket server is running on. At work my ip is 172.16.0.94 hence it connects to that from here. If you make this
		// localhost then via other devises it wont work as their localhost is different from your localhost. Hence use ip
		var socket = io.connect(window.location.origin);

		var pathnameArray = window.location.pathname.split("/");
		socket.emit("join", {
			"room": pathnameArray[1] + pathnameArray[2] + pathnameArray[3]
		});

		socket.on("joinedSuccessfully", function(msg) {
			//console.log(msg);
		});

		socket.on("updateYourselfSon", function(data) {
			//console.log("----DATA RECEIVED----");


			//append html before appeanding javascript or jQuery ready won't fire correctly
			document.body.innerHTML = data.html;

			document.head.removeChild(document.getElementById("chaicode_js"));
			var script_element = document.createElement("script");
			script_element.id = "chaicode_js";
			script_element.textContent = '//<![CDATA[' + "\n" + data.js + "\n" + '//]]>';
			var a = document.head.appendChild(script_element);
			//console.log(a);

			document.getElementById("chaicode_css").textContent = data.css;


			/*Since its hard coded to be wrapped in $(document).ready() currently, I emit the ready event again 
			to reload javascript on the page after updating it. I doubt this is needed.*/
			$(document).ready();
		});
	});

})(jQuery);