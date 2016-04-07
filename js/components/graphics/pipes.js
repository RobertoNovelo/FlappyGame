var PipesGraphicsComponent = function(entity, image_source) {
    this.entity = entity;
    this.image = new Image();
    this.image.src = image_source;
};

PipesGraphicsComponent.prototype.draw = function(context) {
    //console.log("Drawing pipes");

    var position = this.entity.components.physics.position;
    var size = this.entity.components.size;

    // General Pipe Graphics Component
    context.save();
    context.translate(position.x, position.y);
    context.drawImage(this.image, 150, 45, 300, 510, 0, 0, size.x, size.y);
    /*context.beginPath();
    context.rect(0, 0, size.x, size.y);
    context.fillStyle = "green";
    context.fill();
    context.closePath();*/
    context.restore();
};

exports.PipesGraphicsComponent = PipesGraphicsComponent;