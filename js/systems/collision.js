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
        if(entityA.components.collision.boolean) {
            $(".game-screen").hide();
            $(".endgame").show();
        }
    }
};

/*CollisionSystem.prototype.callback = function() {
    
};*/

exports.CollisionSystem = CollisionSystem;