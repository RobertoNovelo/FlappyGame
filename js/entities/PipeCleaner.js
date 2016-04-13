var graphicsComponent = require("../components/graphics/pipes");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");
var canvas = document.getElementById('main-canvas');

var PipeCleaner = function() {

	var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.x = -(canvas.width / canvas.height);
    physics.position.y = 0;

    var graphics = new graphicsComponent.PipesGraphicsComponent(this);

    var size = {
    	x: 1 / canvas.width,
    	y: 1
    };

    var collision = new collisionComponent.RectCollisionComponent(this, size);
    collision.onCollision = this.onCollision.bind(this);

    this.components = {
    	physics: physics,
        graphics: graphics,
        collision: collision,
        size: size
    };

};

PipeCleaner.prototype.onCollision = function() {
    console.log("PipeCleaner on duty!");
};

exports.PipeCleaner = PipeCleaner;