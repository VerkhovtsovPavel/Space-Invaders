var Bullet = function(position, velocity) {
	this.size = {width: 3, height: 3};
	this.position = position;
	this.velocity = velocity;
}

Bullet.prototype = {
	update: function() {
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
	}
}


