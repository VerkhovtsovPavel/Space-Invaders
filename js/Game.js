include("js/Invader.js");
include("js/Player.js");

var Game = function(canvasId) {
	var canvas = document.getElementById(canvasId);
	var screen = canvas.getContext('2d');
	this.stopGame = false;
	this.playerAlive = true;
	this.gameSize = {
		x: canvas.width,
		y: canvas.height
	};

	this.bodies = createInvaders(this).concat([new Player(this)]);

	var self = this;
	var tick = function() {
		self.update(self.gameSize);
		self.draw(screen, self.gameSize);
		if(this.stopGame){
			console.log("End Game");
			return;
		}
		requestAnimationFrame(tick);
	}

	tick();
}

Game.prototype = {
	update: function(gameSize) {
		this.stopGame = true;

		var bodies = this.bodies;

		var notCollidintWithAnything = function(b1) {
			return bodies.filter(function(b2) {
				return colliding(b1, b2);
			}).length == 0;
		}

		this.bodies = this.bodies.filter(notCollidintWithAnything);
 
		for(var i=0; i< this.bodies.length; i++) {
			if(this.bodies[i].position.y<0 || this.bodies[i].position.y>gameSize.height){
				this.bodies.splice(i,1);
			}

			if(this.bodies[i] instanceof Player){
				this.stopGame = true;
			}

			else if (this.bodies[i] instanceof Invader && this.bodies[i].position.y > gameSize.height / 10 * 9){
				this.stopGame = true;
			}

			

		}
			
		for(var i=0; i< this.bodies.length; i++) {
			this.bodies[i].update();
		}	
	}, 

	draw: function(screen, gameSize) {
		clearCanvas(screen, gameSize);
		for(var i=0; i< this.bodies.length; i++) {
			drawRect(screen, this.bodies[i]);
		}
	},

	addBody: function(body) {
		this.bodies.push(body);
	}
}


var clearCanvas = function(screen, gameSize) {
	screen.clearRect(0, 0, gameSize.x, gameSize.y);
}

var drawRect = function(screen, body) {
	screen.fillRect(body.position.x, body.position.y, body.size.width, body.size.height);
}

var	colliding = function(b1, b2) {
	var isInvader = b2 instanceof Invader;
	return !(b1==b2 ||
			b1.position.x + b1.size.width / 2 < b2.position.x - b2.size.width / 2 	||
			b1.position.y + b1.size.height / 2 < b2.position.y - b2.size.height / 2 ||
			b1.position.x - b1.size.width / 2 > b2.position.x + b2.size.width / 2 	||
			b1.position.y - b1.size.height / 2 > b2.position.y + b2.size.height / 2 ||
			(b1.playerBullet == false && b2 instanceof Invader)						||
			(b2.playerBullet == false && b1 instanceof Invader)	
			);

}

var createInvaders = function(game) {
	var invaders = [];

	for (var i=0; i< 30; i++) {
		var x = 30 + (i%6) * 30;
		var y = 30 + (i%5) * 30;

		invaders.push(new Invader(game, {x:x, y:y}))
	}
	return invaders;
}