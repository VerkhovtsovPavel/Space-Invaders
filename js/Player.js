include("js/Keyboarder.js");
include("js/Bullet.js");
var Player = function(game, gameSize) {
	this.game = game;
	this.size = {width: 16, height: 16};
	this.position = {x: gameSize.x/2-this.size.width/2, y: gameSize.y/2-this.size.height/2};
	this.keyboarder = new Keyboarder();
}

Player.prototype = {
	update: function() {
		if(this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
			this.position.x -= 2;
		}
		else if(this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
			this.position.x += 2;
		}
		else if(this.keyboarder.isDown(this.keyboarder.KEYS.SPACE)) {
			var bullet = new Bullet({x:this.position.x+this.size.width/2, y:this.position.y}, {x:0, y:-6})
			this.game.addBody(bullet);
		} 
	}
}

function include(url) {
    var script = document.createElement('script');
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}