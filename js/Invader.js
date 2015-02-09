include("js/Bullet.js");
var Invader = function(game, position) {
	this.game = game;
	this.size = {width: 16, height: 16};
	this.position = position;
	this.timer = 1;
	this.fireSpeed = randomValue(0, 500);
	this.patrolX = 0;
	this.speedX = 1;
	this.speedUpX = 0.5;
}

Invader.prototype = {
	update: function() {
		if (this.patrolX < 0 || this.patrolX > 500){
			this.speedX+=this.speedUpX;
			this.speedX=-this.speedX;
			this.speedUpX=-this.speedUpX;
			this.position.y+=20;

			//this.speedX*=1.3;
		}

		if(this.timer % this.fireSpeed == 0){
			var bullet = new Bullet({x:this.position.x+this.size.width/2-3/2, y:this.position.y + 4}, {x:0, y:6}, false)
				this.game.addBody(bullet);
				this.fireSpeed = randomValue(500, 1000);;
		}

		this.position.x += this.speedX;
		this.patrolX += this.speedX;
		this.timer++;

	},

	draw: function() {
		this.game.screen.fillRect(body.position.x, body.position.y, body.size.width, body.size.height);
	}
}

function randomValue(min, max) {

  var rand = (min - 1) + Math.random() * ((max + 1) - (min - 1));

  rand = Math.round(rand);

  while (rand == min - 1 || rand == max + 1) {

    var rand = (min - 1) + Math.random() * ((max + 1) - (min - 1));

    rand = Math.round(rand);

  }

  return rand;

}