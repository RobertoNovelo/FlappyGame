// var flappyBird = require('./flappy_bird');

/*document.addEventListener('DOMContentLoaded', function() {
    var app = new flappyBird.FlappyBird();
    app.run();
});*/

var available_stamps = [];
var current_stamp = 0;

$("#stamppick").on("click", function() {
	$(".options").fadeOut("fast", function() {
		$("#stamppickscreen").fadeIn("fast");
	});		
});

$("#stamppickscreen").on("click", ".stampcontainer" ,function() {
	$(".stampcontainer").removeClass("selectedstamp");
	$(this).addClass("selectedstamp");
	setUserStamp($(this).data("stampindex"));
	setUserStampScreen(current_stamp);

	setTimeout(function() {
		$("#stamppickscreen").fadeOut("fast", function() {
			$(".options").fadeIn("fast");
		});		
	}, 600);
})


function loadStamps() {
	$.getJSON("./stamps.json", function(data) {
		available_stamps = data.stamps;
		showStampOptions();
		console.log(available_stamps);
		setUserStampScreen(current_stamp);
	})
}

function showStampOptions() {
	$("#stamppickscreen").empty();
	for (var stamp in available_stamps) {
		console.log(available_stamps[stamp]);
		var isSelected = (stamp == current_stamp)?'selectedstamp':'';
		$("#stamppickscreen").append('<div data-stampindex="'+ stamp +'"class="stampcontainer pointer transition ' + isSelected + '"><h2>' + available_stamps[stamp].stamp_name + '</h2><img src="' + available_stamps[stamp].image + '"></div>');
	}

}

function initUserStamp() {
	if (null != localStorage.getItem("current_stamp")) {
		current_stamp = localStorage.getItem("current_stamp");
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

$(function() {
	initUserStamp();
	loadStamps();
})