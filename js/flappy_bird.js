var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require('./systems/input');
var PipeSpawnSystem = require('./systems/PipeSpawn');
var birdgraphicsSystem = require('./systems/birdgraphics');


var bird = require('./entities/bird');
var floor = require('./entities/Floor');
var ceiling = require('./entities/Ceiling');
var pipecleaner = require('./entities/PipeCleaner');


var FlappyBird = function(image_source, image_size) {
    this.entities = [new bird.Bird(image_source, image_size), new pipecleaner.PipeCleaner(), new floor.Floor(), new ceiling.Ceiling()];
    this.graphics = [];

    for (var i = 0; i < this.entities.length; i++) {
        if (i === 0) {
        this.graphics[0] = new birdgraphicsSystem.BirdGraphicsSystem(this.entities[0]);
        }
        else {
            this.graphics[i] = new graphicsSystem.GraphicsSystem(this.entities[i]);
        }   
    }
    
    this.physics = new physicsSystem.PhysicsSystem(this.entities);
    this.input = new inputSystem.InputSystem(this.entities);
    this.PipeSpawn = new PipeSpawnSystem.PipeSpawnSystem(this.entities, "./images/Mailbox.jpg");
};

FlappyBird.prototype.run = function() {
    this.graphics[0].run();
    this.physics.run();
    this.input.run();
    this.PipeSpawn.run();
};

FlappyBird.prototype.pause = function() {
	this.graphics.pause();
    this.physics.pause();
    this.PipeSpawn.pause();
};

FlappyBird.prototype.resume = function() {
	this.graphics.run();
    this.physics.run();
    this.PipeSpawn.run();
};

exports.FlappyBird = FlappyBird;