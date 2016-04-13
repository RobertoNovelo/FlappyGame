(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var RectCollisionComponent = function(entity, size) {
    this.entity = entity;
    this.size = size;
    this.type = 'rect';
};

RectCollisionComponent.prototype.collidesWith = function(entity) {
    if (entity.components.collision.type == 'circle') {
        return this.collideCircle(entity);
    }
    else if (entity.components.collision.type == 'rect') {
        return this.collideRect(entity);
    }
    return false;
};

RectCollisionComponent.prototype.collideCircle = function(entity) {
    return entity.components.collision.collideRect(this.entity);
};

RectCollisionComponent.prototype.collideRect = function(entity) {
    var positionA = this.entity.components.physics.position;
    var positionB = entity.components.physics.position;

    //console.log(this);
    //console.log(entity);

    var sizeA = this.size;
    var sizeB = entity.components.size;



    var leftA = positionA.x;
    var rightA = positionA.x + sizeA.x;
    var bottomA = positionA.y;
    var topA = positionA.y + sizeA.y;

    var leftB = positionB.x;
    var rightB = positionB.x + sizeB.x;
    var bottomB = positionB.y;
    var topB = positionB.y + sizeB.y;

    return !(leftA > rightB || leftB > rightA ||
             bottomA > topB || bottomB > topA);
};

exports.RectCollisionComponent = RectCollisionComponent;
},{}],2:[function(require,module,exports){
var BirdGraphicsComponent = function(entity) {
    this.entity = entity;
    this.image = new Image();
    this.image.src = localStorage.getItem("current_stamp_image")
    
    
    //console.log(image);
};

BirdGraphicsComponent.prototype.image = null;

BirdGraphicsComponent.prototype.draw = function(context) {
    //console.log("Drawing a bird");

    var position = this.entity.components.physics.position;
    var size = this.entity.components.size

    context.save();
    context.translate(position.x, position.y);


    context.drawImage(this.image, 0, 0, 800, 499, 0, 0, size.x, size.y);

    /*context.beginPath();
    context.arc(0, 0, 0.03, 0, 2 * Math.PI);
    context.fillStyle = "gold"
    context.fill();
    context.closePath();*/

    context.restore();
};

exports.BirdGraphicsComponent = BirdGraphicsComponent;
},{}],3:[function(require,module,exports){
var PipesGraphicsComponent = function(entity) {
    this.entity = entity;
    this.image = new Image();
    this.image.src = "./images/Mailbox.jpg";
};

PipesGraphicsComponent.prototype.draw = function(context) {
    //console.log("Drawing pipes");

    var position = this.entity.components.physics.position;
    var size = this.entity.components.size;

    // General Pipe Graphics Component
    context.save();
    context.translate(position.x, position.y);
    //context.drawImage(this.image, 150, 45, 300, 510, 0, 0, size.x, size.y);
    context.beginPath();
    context.rect(0, 0, size.x, size.y);
    context.fillStyle = "green";
    context.fill();
    context.closePath();
    context.restore();
};

exports.PipesGraphicsComponent = PipesGraphicsComponent;
},{}],4:[function(require,module,exports){
var PhysicsComponent = function(entity) {
    this.entity = entity;

    this.position = {
        x: 0,
        y: 0
    };
    this.velocity = {
        x: 0,
        y: 0
    };
    this.acceleration = {
        x: 0,
        y: 0
    };
};

PhysicsComponent.prototype.update = function(delta) {
    this.velocity.x += this.acceleration.x * delta;
    this.velocity.y += this.acceleration.y * delta;

    this.position.x += this.velocity.x * delta;
    this.position.y += this.velocity.y * delta;
};

exports.PhysicsComponent = PhysicsComponent;
},{}],5:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/pipes");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");
var canvas = document.getElementById('main-canvas');

var Bottom_Pipe = function() {
    //console.log("Creating Pipes entity");

    var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.x = canvas.width / (2 * canvas.height);
    physics.position.y = 0;
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

Bottom_Pipe.prototype.onCollision = function(entity) {
    console.log("Bird collided with entity:", entity);
};

exports.Bottom_Pipe = Bottom_Pipe;
},{"../components/collision/rect":1,"../components/graphics/pipes":3,"../components/physics/physics":4}],6:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/pipes");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");
var canvas = document.getElementById('main-canvas');

var Ceiling = function() {

	var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.x = - (canvas.width / canvas.height);
    physics.position.y = 1;

    var graphics = new graphicsComponent.PipesGraphicsComponent(this);

    var size = {
    	x: 2 * (canvas.width / canvas.height),
    	y: 1 / canvas.height
    };

    var collision = new collisionComponent.RectCollisionComponent(this);
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
},{"../components/collision/rect":1,"../components/graphics/pipes":3,"../components/physics/physics":4}],7:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/pipes");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");
var canvas = document.getElementById('main-canvas');

var Floor = function() {

	var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.x = - (canvas.width / canvas.height);
    physics.position.y = - 1 / canvas.height;

    var graphics = new graphicsComponent.PipesGraphicsComponent(this);

    var size = {
    	x: 2 * (canvas.width / canvas.height),
    	y: 1 / canvas.height
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

Floor.prototype.onCollision = function(entity) {
    console.log("Bird collided with entity:", entity);
};

exports.Floor = Floor;
},{"../components/collision/rect":1,"../components/graphics/pipes":3,"../components/physics/physics":4}],8:[function(require,module,exports){
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
},{"../components/collision/rect":1,"../components/graphics/pipes":3,"../components/physics/physics":4}],9:[function(require,module,exports){
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
},{"../components/collision/rect":1,"../components/graphics/pipes":3,"../components/physics/physics":4}],10:[function(require,module,exports){
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
},{"../components/collision/rect":1,"../components/graphics/bird":2,"../components/physics/physics":4}],11:[function(require,module,exports){
var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require('./systems/input');
var PipeSpawnSystem = require('./systems/PipeSpawn');
var scoreSystem = require('./systems/score');


var bird = require('./entities/bird');
var floor = require('./entities/Floor');
var ceiling = require('./entities/Ceiling');
var pipecleaner = require('./entities/PipeCleaner');


var FlappyBird = function() {
    this.entities = [new bird.Bird(), new pipecleaner.PipeCleaner(), new floor.Floor(), new ceiling.Ceiling()];
    this.graphics = new graphicsSystem.GraphicsSystem(this.entities); 
    this.physics = new physicsSystem.PhysicsSystem(this.entities);
    this.input = new inputSystem.InputSystem(this.entities);
    this.PipeSpawn = new PipeSpawnSystem.PipeSpawnSystem(this.entities);
    this.score = new scoreSystem.ScoreSystem();
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

exports.FlappyBird = FlappyBird;
},{"./entities/Ceiling":6,"./entities/Floor":7,"./entities/PipeCleaner":8,"./entities/bird":10,"./systems/PipeSpawn":13,"./systems/graphics":15,"./systems/input":16,"./systems/physics":17,"./systems/score":18}],12:[function(require,module,exports){
var flappyBird = require('./flappy_bird');
var app = null;

/*document.addEventListener('DOMContentLoaded', function() {
    app = new flappyBird.FlappyBird(available_stamps[current_stamp].image);
});*/

$('.play-button').on('click', function() {
	$('#overlay').fadeOut(1000, function() {
		app = new flappyBird.FlappyBird();
		app.run();
	});
});

document.addEventListener('keydown', function(e) {
	if (e.keyCode == 32) {
		app.pause();
	}

	if (e.keyCode == 82) {
		app.resume();
	}
});

var available_stamps = [];
var available_backgrounds = [];
var current_stamp = 0;
var current_background = 0;
var stamp_shapes = ["square", "horizontal", "vertical"];
var maxscore = 0;
var square = 0;
var horizontal = 0;
var vertical = 0;

// Displays Options window when the Options icon is clicked
$("#stamppick").on("click", function() {
	$(".background_choice").fadeOut("fast");
	$(".options").fadeOut("fast", function() {
		$("#stamppickscreen").fadeIn("fast");
	});		
});

// Select a new stamp by clicking on it, updates the stamp on the Preview page through setUserStampScreen(), and then closes the Options window
$("#stamppickscreen").on("click", ".stampcontainer" ,function() {
	if (available_stamps[$(this).data("stampindex")].unlocked) {
		$(".stampcontainer").removeClass("selectedstamp");
		$(this).addClass("selectedstamp");
		setUserStamp($(this).data("stampindex"));
		setUserStampScreen(current_stamp);

		setTimeout(function() {
			$("#stamppickscreen").fadeOut("fast", function() {
				$(".options").fadeIn("fast");
				$(".background_choice").fadeIn("fast");
			});		
		}, 600);
	}
});

$(".background_choice").on("click", ".background_icon", function() {
	setBackground($(this).data("background"));
});

// Load backgrounds from backgrounds.json into variable available_backgrounds
function loadBackgrounds() {
	$.getJSON("./backgrounds.json", function(data) {
		available_backgrounds = data.backgrounds;
		//showBackgroundOptions();
		//setBackground(current_background);
		//console.log(available_backgrounds);
	});

}

function setBackground(image) {
	$("html").css("background", "url(./images/" + image + ") no-repeat center center");
}

// Load stamps from stamps.json into variable available_stamps
function loadStamps() {
	$.getJSON("./stamps.json", function(data) {
		available_stamps = data.stamps;
		showStampOptions();
		setUserStampScreen(current_stamp);
		unlockStamps();
		localStorage.setItem("current_stamp_image", available_stamps[current_stamp].image);
	});
}

// Shows which stamp is selected in the Options window, also shows the availability of unlocked stamps
function showStampOptions() {
	$("#stamppickscreen").empty();
	for (var stamp in available_stamps) {
		var isSelected = (stamp == current_stamp)?'selectedstamp':'';
		var isLocked = (!available_stamps[stamp].unlocked)?'lockedstamp':'';
		$("#stamppickscreen").append('<div data-stampindex="'+ stamp +'"class="stampcontainer pointer transition ' + isLocked + ' ' + isSelected + '"><h2>' + available_stamps[stamp].stamp_name + '</h2><img src="' + available_stamps[stamp].image + '"></div>');
	}
}

// Changes the current stamp index from the Options window
function setUserStamp(stamp_index) {
	if (available_stamps[stamp_index].unlocked) {
		localStorage.setItem("current_stamp", stamp_index);
		current_stamp = stamp_index;
		localStorage.setItem("current_stamp_image", available_stamps[current_stamp].image);
	}

}

// Displays the current selected stamp on the display page before entering the game
function setUserStampScreen(stamp_index) {
	$("#userStamp h2").text(available_stamps[stamp_index].stamp_name);
	$("#userStamp img").attr("src", available_stamps[stamp_index].image);

}

// Determines which stamps are unlocked by iterating through each stamp and checking the maxscore against each stamp's unlocked score value
function unlockStamps() {
	for (var stamp in available_stamps) {
		if (maxscore >= available_stamps[stamp].unlocked_score) {
			available_stamps[stamp].unlocked = true;
		}
	}
	showStampOptions();
}

// Initializes the current_stamp and maxscore variables from local storage
function initGame() {
	if (null !== localStorage.getItem("current_stamp")) {
		current_stamp = localStorage.getItem("current_stamp");
		
	}
	if (null !== localStorage.getItem("maxscore")) {
		maxscore = localStorage.getItem("maxscore");
	}
}

// Sets the high score at the end of each game and runs unlockStamps()
function endGame(score) {
	var newHigh = false;

	if (score > maxscore) {
		newHigh = true;
		localStorage.setItem("maxscore", score);
		maxscore = score;
		unlockStamps();
	}
	return newHigh;
}

// Runs initGame(), loadStamps(), and loadBackgrounds() when page is loading
$(function() {
	initGame();
	loadStamps();
	loadBackgrounds();
});
},{"./flappy_bird":11}],13:[function(require,module,exports){
var Top_Pipe = require("../entities/Top_Pipe");
var Bottom_Pipe = require("../entities/Bottom_Pipe");

var PipeSpawnSystem = function(entities) {
	this.entities = entities;
	this.inverval = null;
}

PipeSpawnSystem.prototype.tick = function() {
	var bird = this.entities[0];

	if (!bird.components.collision.boolean) {
		this.entities.push(new Top_Pipe.Top_Pipe(), new Bottom_Pipe.Bottom_Pipe());
	}	
	//console.log("ping");
}

PipeSpawnSystem.prototype.run = function() {
	this.interval = window.setInterval(this.tick.bind(this), 2000);
}

PipeSpawnSystem.prototype.pause = function() {
    clearInterval(this.interval);   
}

exports.PipeSpawnSystem = PipeSpawnSystem;
},{"../entities/Bottom_Pipe":5,"../entities/Top_Pipe":9}],14:[function(require,module,exports){
var CollisionSystem = function(entities) {
    this.entities = entities;
    this.score = 0;
};
var canvas = document.getElementById('main-canvas');

CollisionSystem.prototype.tick = function() {
    for (var i=0; i<2; i++) {
        var entityA = this.entities[i];
        if (!'collision' in entityA.components) {
            continue;
        }
        if (entityA.components.collision.type == 'rect' && entityA.components.main) {
            for (var j=i+2; j<this.entities.length; j++) {
                var entityB = this.entities[j];                

                if (!'collision' in entityB.components) {
                    continue;
                }
                if (!entityA.components.collision.collidesWith(entityB)) {
                    continue;
                }
                if (entityA.components.collision.onCollision) {
                    entityA.components.collision.onCollision(entityB);
                    entityA.components.physics.position.y = 0.5;
                    entityA.components.physics.acceleration.y = 0;
                    entityA.components.physics.velocity.y = 0;               
                    this.entities.splice(4, this.entities.length - 4);
                    entityA.components.collision.boolean = true;
                }
                if (entityB.components.collision.onCollision) {
                    entityA.components.physics.position.y = 0.5;
                    entityA.components.physics.acceleration.y = 0;
                    entityA.components.physics.velocity.y = 0; 
                    this.entities.splice(4, this.entities.length - 4);
                    entityA.components.collision.boolean = true;
                }
                if (entityA.components.physics.position.y <= 0) {
                    entityA.components.collision.onCollision(this.entities[1]);
                    entityA.components.physics.position.y = 0.5;
                    entityA.components.physics.acceleration.y = 0;
                    entityA.components.physics.velocity.y = 0; 
                    this.entities.splice(4, this.entities.length - 4);
                    entityA.components.collision.boolean = true;
                }
                if (entityA.components.physics.position.y >= 1) {
                    entityA.components.collision.onCollision(this.entities[2]);
                    entityA.components.physics.position.y = 0.5;
                    entityA.components.physics.acceleration.y = 0;
                    entityA.components.physics.velocity.y = 0; 
                    this.entities.splice(4, this.entities.length - 4);
                    entityA.components.collision.boolean = true;
                }
            }                                    
        }
        if (entityA.components.collision.type == 'rect') {
            for (var j=i+3; j<this.entities.length; j++) {
                var entityB = this.entities[j];                

                if (!'collision' in entityB.components) {
                    continue;
                }
                if (!entityA.components.collision.collidesWith(entityB)) {
                    continue;
                }
                if (entityA.components.collision.onCollision) {   
                    entityA.components.collision.onCollision(entityB);        
                    this.entities.splice(4, 2);
                    this.score++;                    
                }
            }
        }
    }
};

exports.CollisionSystem = CollisionSystem;
},{}],15:[function(require,module,exports){
var GraphicsSystem = function(entities) {
    this.entities = entities;
    // Canvas is where we draw
    this.canvas = document.getElementById('main-canvas');
    // Context is what we draw to
    this.context = this.canvas.getContext('2d');
    this.interval = null;
};

GraphicsSystem.prototype.run = function() {
    // Run the render loop
    this.interval = window.requestAnimationFrame(this.tick.bind(this));
};

GraphicsSystem.prototype.tick = function() {
	// Set the canvas to the correct size if the window is resized
    if (this.canvas.width != this.canvas.offsetWidth ||
        this.canvas.height != this.canvas.offsetHeight) {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.save();
    this.context.translate(this.canvas.width / 2, this.canvas.height);
    this.context.scale(this.canvas.height, -this.canvas.height);

    // Clear the canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Rendering goes here
    for (var i=0; i<this.entities.length; i++) {
        var entity = this.entities[i];
        if (!'graphics' in entity.components) {
        	continue;
        }

        entity.components.graphics.draw(this.context);
    }

    this.context.restore();
    
    window.requestAnimationFrame(this.tick.bind(this));
};

GraphicsSystem.prototype.pause = function() {
    window.cancelAnimationFrame(this.interval);   
}

exports.GraphicsSystem = GraphicsSystem;
},{}],16:[function(require,module,exports){
var InputSystem = function(entities) {
    this.entities = entities;

    // Canvas is where we get input from
    this.canvas = document.getElementById('main-canvas');
};

InputSystem.prototype.run = function() {
    this.canvas.addEventListener('click', this.onClick.bind(this));
    this.canvas.addEventListener('touchstart', this.onClick.bind(this));
};

InputSystem.prototype.onClick = function() {
    var bird = this.entities[0];

    if (!bird.components.collision.boolean) {    	
    	bird.components.physics.velocity.y = 0.65;
    }
};

exports.InputSystem = InputSystem;
},{}],17:[function(require,module,exports){
var collisionSystem = require("./collision");

var PhysicsSystem = function(entities) {
    this.entities = entities;
    this.collisionSystem = new collisionSystem.CollisionSystem(entities);
    this.interval = null;
};

PhysicsSystem.prototype.run = function() {
    // Run the update loop
    this.interval = window.setInterval(this.tick.bind(this), 1000 / 60);
};

PhysicsSystem.prototype.tick = function() {
    for (var i=0; i<this.entities.length; i++) {
        var entity = this.entities[i];
        if (!'physics' in entity.components) {
            continue;
        }

        entity.components.physics.update(1/60);
    }
    this.collisionSystem.tick();
    //console.log(this.entities.length);
};

PhysicsSystem.prototype.pause = function() {
    clearInterval(this.interval);   
}

exports.PhysicsSystem = PhysicsSystem;
},{"./collision":14}],18:[function(require,module,exports){
var ScoreSystem = function() {
	var score;
};

ScoreSystem.prototype.run = function() {
    this.score = 0;
    setTimeout(this.interval = window.setInterval(this.tick.bind(this), 2000), 11000);
};

ScoreSystem.prototype.tick = function() {
    this.score++;
    console.log(this.score);    
};

ScoreSystem.prototype.pause = function() {
    clearInterval(this.interval);   
};

ScoreSystem.prototype.resume = function() {
	this.interval = window.setInterval(this.tick.bind(this), 2000);
}

exports.ScoreSystem = ScoreSystem;
},{}]},{},[12]);
