include("js/Keyboarder.js");
include("js/Bullet.js");

var Player = function(game) {
	this.game = game;
	this.timer = 0;
	this.bullets = true;
	this.size = {width: 16, height: 16};
	this.position = {x: game.gameSize.x/2-this.size.width/2, y: game.gameSize.y/10*9-this.size.height/2};
	this.keyboarder = new Keyboarder();
}

Player.prototype = {
	update: function() {
		if(this.keyboarder.isDown(this.keyboarder.KEYS.LEFT) && this.position.x > 0) {
			this.position.x -= 3;
		}
		else if(this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT) && this.position.x < this.game.gameSize.x - this.size.width) {
			this.position.x += 3;
		}
		if(this.keyboarder.isDown(this.keyboarder.KEYS.SPACE) && this.bullets) {
				var bullet = new Bullet({x:this.position.x+this.size.width/2-3/2, y:this.position.y - 4}, {x:0, y:-6})
				this.game.addBody(bullet);
				this.bullets = false;
		}	

		this.timer++;
		if(this.timer % 20 == 0){
			this.bullets = true;
		}

	}
}