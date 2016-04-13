// Ensures access to the graphics, physics, and collision components for the bird as well as the image used to represent the bird
var graphicsComponent = require("../components/graphics/bird");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");

// Creating a Bird Object with multiple components
var Bird = function() {
    //console.log("Creating Bird entity");


    // Sets up the Bird's physics component and initializes position in the middle of the screen 
    var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.y = 0.5;
    physics.acceleration.y = -1.3;

    // Initializes the Bird's graphics component with the included image that is passed through
    var graphics = new graphicsComponent.BirdGraphicsComponent(this);

    // Sets the size for the CollisionComponent
    var size = {
        x: .1,
        y: .1
    };

    var main = true;

    // Initializes the collision component for this rectangular Object using this Object's entity and size
    var collision = new collisionComponent.RectCollisionComponent(this, size);
    collision.onCollision = this.onCollision.bind(this);

    this.components = {
    	physics: physics,
    	graphics: graphics,
    	collision: collision,
        size: size,
        main: main
    };
};

// Announces when the Bird collides with another entity
Bird.prototype.onCollision = function(entity) {
    console.log("Bird collided with entity:", entity);
};

exports.Bird = Bird;