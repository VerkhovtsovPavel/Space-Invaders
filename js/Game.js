var Game = function(canvasId) {
	var canvas = document.getElementById(canvasId);
	var screen = canvas.getContext('2d');
	var gameSize = {
		x: canvas.width,
		y: canvas.height
	};

	this.bodies = [new Player(this, gameSize)];

	var self = this;
	var tick = function() {
		self.update();
		self.draw(screen, gameSize);
		requestAnimationFrame(tick);
	}

	tick();
}

Game.prototype = {
	update: function() {
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