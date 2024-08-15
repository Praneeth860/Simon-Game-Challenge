let buttonColour = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
var level = 0;
var started = false;
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
function nextSequence() {
  userClickedPattern = [];
  var randNum = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColour[randNum];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  playSound("./sounds/" + randomChosenColour + ".mp3");
  level++;
  $("#level-title").text("Level" + level);
}
function playSound(name) {
  audio = new Audio(name);
  audio.play();
}
$(".btn").on("click", function () {
  let userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound("./sounds/" + userChosenColour + ".mp3");
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
function checkAnswer(currentlevel) {
  if (gamePattern[currentlevel] === userClickedPattern[currentlevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong.mp3");
    $("body").toggleClass("game-over");
    setTimeout(() => {
      $("body").toggleClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
$(document).on("keypress", function (e) {
  if (!started) {
    nextSequence();
    started = true;
  }
});
