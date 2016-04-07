var graphicsComponent = require("../components/graphics/pipes");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");
var canvas = document.getElementById('main-canvas');

var Ceiling = function(image_source) {

	var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.x = - (canvas.width / canvas.height);
    physics.position.y = 1;

    var graphics = new graphicsComponent.PipesGraphicsComponent(this, image_source);

    var size = {
    	x: 2 * (canvas.width / canvas.height),
    	y: 1 / canvas.height
    };

    var collision = new collisionComponent.RectCollisionComponent(this, image_source);
    collision.onCollision = this.onCollision.bind(this);
    
    this.components = {
    	physics: physics,
        graphics: graphics,
        collision: collision,
        size: size
    };

};

Ceiling.prototype.onCollision = function(entity) {
    console.log("Bird collided with entity:", entity);
};

exports.Ceiling = Ceiling;