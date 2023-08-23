
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).on("keypress", function () {
  if (started == false) {
    started = true;
    $("#level-title").text("Level " + level);
    nextSequence();

  }
});


$(".btn").on("click", function () {

  var userChoosenColor = $(this).attr("id");
  userClickedPattern.push(userChoosenColor);

  // console.log(userClickedPattern);

  playSound(userChoosenColor);

  animatePress(userChoosenColor);

  checkAnswer(userClickedPattern.length);

  // var audio = new Audio("sounds/" + userChoosenColor + ".mp3")
  // audio.play();

});


function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel - 1] === userClickedPattern[currentLevel - 1]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }

  else {
    $("body").addClass("game-over");
    playSound("wrong")
    setTimeout(function () {
      $("body").removeClass("game-over")
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();

  }
}


function nextSequence() {
  userClickedPattern = [];
  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // console.log(gamePattern);

  //animation when color got clicked
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  // audio on clicking color
  playSound(randomChosenColor);

  // var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
  // audio.play();



};

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  started = false;

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColor) {
  console.log(currentColor);

  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


