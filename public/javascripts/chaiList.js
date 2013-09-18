(function($){
	$(document).ready(function(){
		$.each($(".chai"), function(){
			var iframe_doc = this.getElementsByClassName("output")[0].getElementsByTagName("iframe")[0].contentWindow.document,
				iframe_head = iframe_doc.getElementsByTagName("head")[0],
				$this = $(this),
				html = $this.children(".js-html").html(),
				css = $this.children(".js-css").text(),
				js = '//<![CDATA[' + "\n" + $this.children(".js-js").text() + "\n" + '//]]>',
				jquery = iframe_doc.createElement("script"),
				style = iframe_doc.createElement("style"),
				script = iframe_doc.createElement("script");
				console.log(js);
				console.log(css);
			/*insert style*/
			iframe_head.appendChild(style);
			
			/*insert jquery*/
			jquery.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js";
			iframe_head.appendChild(jquery);

			/*insert user javascript*/
			iframe_head.appendChild(script);

			/*Waits for content to load in the iframe. content like jquery etc*/
			var iframe_doc_readyState_timer = window.setInterval(function(){
			if (iframe_doc.readyState === "complete"){
				window.clearInterval(iframe_doc_readyState_timer);
				/*Load html before css or js so that they can parse and attach to the html properly*/
				iframe_doc.getElementsByTagName("body")[0].innerHTML = html;
				style.innerHTML = css;
				script.innerHTML = js;
			}
			}, 100);
		});

		$('#new_button').click(function() {
			window.location = window.location.origin;
		});
	});
})(jQuery);