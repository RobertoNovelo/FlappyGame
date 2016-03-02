var graphicsSystem = require('./systems/graphics');
var bird = require('./entities/bird');
var pipes = require('./entities/pipe');

var FlappyBird = function() {
    this.entities = [new bird.Bird(), new pipe.Pipes()];
    this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
};

FlappyBird.prototype.run = function() {
    this.graphics.run();
};

exports.FlappyBird = FlappyBird;