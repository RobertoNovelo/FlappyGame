var graphicsComponent = require("../components/graphics/pipes");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");
var canvas = document.getElementById('main-canvas');

var Bottom_Pipe = function(image_source) {
    //console.log("Creating Pipes entity");

    var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.x = canvas.width / (2 * canvas.height);
    physics.position.y = 0;
    physics.velocity.x = -0.4;

    var graphics = new graphicsComponent.PipesGraphicsComponent(this, image_source);

    var size = {
        x: 0.1,
        y: 0.4
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

Bottom_Pipe.prototype.onCollision = function(entity) {
    console.log("Bird collided with entity:", entity);
};

exports.Bottom_Pipe = Bottom_Pipe;