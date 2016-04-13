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