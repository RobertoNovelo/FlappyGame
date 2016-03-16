// var flappyBird = require('./flappy_bird');

/*document.addEventListener('DOMContentLoaded', function() {
    var app = new flappyBird.FlappyBird();
    app.run();
});*/

var available_stamps = [];
var current_stamp = 0;
var maxscore = 0;

$("#stamppick").on("click", function() {
	$(".options").fadeOut("fast", function() {
		$("#stamppickscreen").fadeIn("fast");
	});		
});

$("#stamppickscreen").on("click", ".stampcontainer" ,function() {
	if (available_stamps[$(this).data("stampindex")].unlocked) {
		$(".stampcontainer").removeClass("selectedstamp");
		$(this).addClass("selectedstamp");
		setUserStamp($(this).data("stampindex"));
		setUserStampScreen(current_stamp);

		setTimeout(function() {
			$("#stamppickscreen").fadeOut("fast", function() {
				$(".options").fadeIn("fast");
			});		
		}, 600);
	}

})

function loadStamps() {
	$.getJSON("./stamps.json", function(data) {
		available_stamps = data.stamps;
		showStampOptions();
		console.log(available_stamps);
		setUserStampScreen(current_stamp);
		unlockStamps();
	})
}

function showStampOptions() {
	$("#stamppickscreen").empty();
	for (var stamp in available_stamps) {
		console.log(available_stamps[stamp]);
		var isSelected = (stamp == current_stamp)?'selectedstamp':'';
		var isLocked = (!available_stamps[stamp].unlocked)?'lockedstamp':'';
		$("#stamppickscreen").append('<div data-stampindex="'+ stamp +'"class="stampcontainer pointer transition ' + isLocked + ' ' + isSelected + '"><h2>' + available_stamps[stamp].stamp_name + '</h2><img src="' + available_stamps[stamp].image + '"></div>');
	}

}

function initGame() {
	if (null != localStorage.getItem("current_stamp")) {
		current_stamp = localStorage.getItem("current_stamp");
	}
	if (null != localStorage.getItem("maxscore")) {
		maxscore = localStorage.getItem("maxscore");
	}
}

function setUserStamp(stamp_index) {
	if (available_stamps[stamp_index].unlocked) {
		localStorage.setItem("current_stamp", stamp_index);
		current_stamp = stamp_index;
	}
}

function setUserStampScreen(stamp_index) {
	console.log(available_stamps[stamp_index]);
	$("#userStamp h2").text(available_stamps[stamp_index].stamp_name);
	$("#userStamp img").attr("src", available_stamps[stamp_index].image);
}

function unlockStamps() {
	for (var stamp in available_stamps) {
		if (maxscore >= available_stamps[stamp].unlocked_score) {
			available_stamps[stamp].unlocked = true;
		}
	}
	showStampOptions();
}

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

$(function() {
	initGame();
	loadStamps();
})