;(function(){

    include("js/Player.js");
    include("js/Game.js")

	window.onload = function(){
		new Game("screen");
	}
})();



function include(url) {
    var script = document.createElement('script');
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}