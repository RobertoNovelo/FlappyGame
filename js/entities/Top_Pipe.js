var graphicsComponent = require("../components/graphics/pipes");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");
var canvas = document.getElementById('main-canvas');

var Top_Pipe = function() {
    //console.log("Creating Pipes entity");

    var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.x = canvas.width / (2 * canvas.height);
    physics.position.y = 0.65;
    physics.velocity.x = -0.4;

    var graphics = new graphicsComponent.PipesGraphicsComponent(this);

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

Top_Pipe.prototype.onCollision = function(entity) {
    console.log("Bird collided with entity:", entity);
};

exports.Top_Pipe = Top_Pipe;