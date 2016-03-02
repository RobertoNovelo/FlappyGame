var graphicsComponent = require("../components/graphics/pipes");

var Pipes = function() {
	console.log("Creating Pipes Entity");

	var graphics = new graphicsComponent.PipesGraphicsComponent(this);
	this.components = {
		graphics: graphics
	};
};

exports.Pipes = Pipes;