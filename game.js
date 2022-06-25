var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"]
var gamePattern = [];
var level = 0;
var started = false;

$(document).keydown(function () {
    if (!started) {
        started = true;
        $("h1").text("Level " + level);
        nextSequence();
    }
});

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    // alert(randomChosenColour);
    $("#" + randomChosenColour).fadeIn().fadeOut().fadeIn();
    // console.log(this);
    playSound(randomChosenColour);

}

function playSound(name) {
    var audio = new Audio("sounds/" + name + '.mp3');
    audio.play();
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length == gamePattern.length) {
            // console.log("success");
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        // console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }

}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

