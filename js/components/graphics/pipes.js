var PipesGraphicsComponent = function(entity) {
	this.entity = entity;
};

PipesGraphicsComponent.prototype.draw = function() {
	console.log("Drawing a pipe");
};

exports.PipesGraphicsComponent = PipesGraphicsComponent;