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


    //context.drawImage(this.image, 0, 0, 300, 300, 0, 0, size.x, size.y);

    context.beginPath();
    context.arc(0, 0, 0.03, 0, 2 * Math.PI);
    context.fillStyle = "gold"
    context.fill();
    context.closePath();
    context.restore();
};

exports.BirdGraphicsComponent = BirdGraphicsComponent;