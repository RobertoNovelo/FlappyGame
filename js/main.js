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