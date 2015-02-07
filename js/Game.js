include("js/Invader.js");
include("js/Player.js");

var Game = function(canvasId) {
	var canvas = document.getElementById(canvasId);
	var screen = canvas.getContext('2d');
	var gameSize = {
		x: canvas.width,
		y: canvas.height
	};

	this.bodies = createInvaders(this).concat([new Player(this, gameSize)]);

	var self = this;
	var tick = function() {
		self.update(gameSize);
		self.draw(screen, gameSize);
		requestAnimationFrame(tick);
	}

	tick();
}

Game.prototype = {
	update: function(gameSize) {
		var bodies = this.bodies;

		var notCollidintWithAnything = function(b1) {
			return bodies.filter(function(b2) {
				return colliding(b1, b2);
			}).length == 0;
		}

		this.bodies = this.bodies.filter(notCollidintWithAnything);
 
		for(var i=0; i< this.bodies.length; i++) {
			if(this.bodies[i].position.y<0){
				this.bodies.splice(i,1);
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
	return !(b1==b2 ||
			b1.position.x + b1.size.width / 2 < b2.position.x - b2.size.width / 2 	||
			b1.position.y + b1.size.height / 2 < b2.position.y - b2.size.height / 2 ||
			b1.position.x - b1.size.width / 2 > b2.position.x + b2.size.width / 2 	||
			b1.position.y - b1.size.height / 2 > b2.position.y + b2.size.height / 2 );

}

var createInvaders = function(game) {
	var invaders = [];

	for (var i=0; i< 24; i++) {
		var x = 30 + (i%8) * 30;
		var y = 30 + (i%3) * 30;

		invaders.push(new Invader(game, {x:x, y:y}))
	}
	return invaders;
}