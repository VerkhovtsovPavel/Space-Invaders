var Bullet = function(position, velocity, playerBullet) {
	this.size = {width: 3, height: 3};
	this.playerBullet = playerBullet;
	this.position = position;
	this.velocity = velocity;
}

Bullet.prototype = {
	update: function() {
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
	}
}


