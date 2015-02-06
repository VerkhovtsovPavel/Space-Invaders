var Invader = function(game, position) {
	this.game = game;
	this.size = {width: 16, height: 16};
	this.position = position;
	this.patrolX = 0;
	this.speedX = 1;
}

Invader.prototype = {
	update: function() {
		if (this.patrolX < 0 || this.patrolX > 500){
			this.speedX=-this.speedX;
		}

		this.position.x += this.speedX;
		this.patrolX += this.speedX;
	}
}