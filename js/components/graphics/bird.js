var BirdGraphicsComponent = function(entity, image_source, image_size) {
    this.entity = entity;
    this.image = new Image();
    this.image.src = image_source;
    this.image_loaded = null;
    var context = {x: this};
    var onload = (function() {
        this.x.image_loaded = true;
    }).bind(context);

    this.image.onload = onload;
    this.image_size = image_size
    
    
    //console.log(image);
};

BirdGraphicsComponent.prototype.image = null;

BirdGraphicsComponent.prototype.draw = function(context) {
    //console.log("Drawing a bird");

    var position = this.entity.components.physics.position;
    var size = this.entity.components.size

    context.save();
    context.translate(position.x, position.y);

    if (this.image_loaded) {
        context.drawImage(this.image, 0, 0, this.image_size.x, this.image_size.y, 0, 0, size.x, size.y);
    };
    /*context.beginPath();
    context.arc(0, 0, 0.03, 0, 2 * Math.PI);
    context.fillStyle = "gold"
    context.fill();
    context.closePath();*/
    context.restore();
};

exports.BirdGraphicsComponent = BirdGraphicsComponent;