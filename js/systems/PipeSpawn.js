var Top_Pipe = require("../entities/Top_Pipe");
var Bottom_Pipe = require("../entities/Bottom_Pipe");

var PipeSpawnSystem = function(entities) {
	this.entities = entities;
	this.inverval = null;
}

PipeSpawnSystem.prototype.tick = function() {
	var bird = this.entities[0];

	if (!bird.components.collision.boolean) {
		this.entities.push(new Top_Pipe.Top_Pipe(), new Bottom_Pipe.Bottom_Pipe());
	}	
	//console.log("ping");
}

PipeSpawnSystem.prototype.run = function() {
	this.interval = window.setInterval(this.tick.bind(this), 2000);
}

PipeSpawnSystem.prototype.pause = function() {
    clearInterval(this.interval);   
}

exports.PipeSpawnSystem = PipeSpawnSystem;