var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require('./systems/input');
var PipeSpawnSystem = require('./systems/PipeSpawn');
var scoreSystem = require('./systems/score');


var bird = require('./entities/bird');
var floor = require('./entities/Floor');
var ceiling = require('./entities/Ceiling');
var pipecleaner = require('./entities/PipeCleaner');


var FlappyBird = function(fn) {
    this.entities = [new bird.Bird(), new pipecleaner.PipeCleaner(), new floor.Floor(), new ceiling.Ceiling()];
    this.graphics = new graphicsSystem.GraphicsSystem(this.entities); 
    this.physics = new physicsSystem.PhysicsSystem(this.entities);
    this.input = new inputSystem.InputSystem(this.entities);
    this.PipeSpawn = new PipeSpawnSystem.PipeSpawnSystem(this.entities);
    this.score = new scoreSystem.ScoreSystem();
    bird.onCollision = fn;
};

FlappyBird.prototype.run = function() {
    this.graphics.run();
    this.physics.run();
    this.input.run();
    this.PipeSpawn.run();
    this.score.run();
};

FlappyBird.prototype.pause = function() {
	this.graphics.pause();
    this.physics.pause();
    this.PipeSpawn.pause();
    this.score.pause();
};

FlappyBird.prototype.resume = function() {
	this.graphics.run();
    this.physics.run();
    this.PipeSpawn.run();
    this.score.resume();
};

FlappyBird.prototype.endgame = function() {

};

exports.FlappyBird = FlappyBird;