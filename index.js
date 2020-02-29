//initial global variables to track color, the pattern for the game, what the user clicks, if the game has already been started, and the level
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;

var level = 0;


//handles the keypress to start the game
$(document).on("keypress", function(event) {

  if (!started) {
    $("h1").text("Level " + level);
    nextSequnce();
    started = true;
  }
});

//this function handles when a user clicks on a button
$("button").on("click", function(event) {

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  animatePress(userChosenColor);
  playSound(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});



function checkAnswer(currentLevel) {
  //checks if the color for the currentLevel matches the color in the gamePattern array
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    //This makes sure that the user has successfully entered every value in the Game Pattern so far, and then gives the next Sequence in game
    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequnce();
      }, 1000);
    }

    //this triggers if user enters incorrect value
  } else {
    $("body").addClass("game-over");
    playSound("wrong");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over Press Any Key to Restart");
    startOver();

  }
}
//resets the global variables that affect gameplay, gives the program a clean slate
function startOver() {
  started = false;
  level = 0;
  gamePattern = [];
}

//This is called to generate  a new random color, display it to user, and add the color to the current gamePatter array
function nextSequnce() {
  userClickedPattern = [];

  level++;
  $("h1").text("Level " + level);
  var number = Math.floor(Math.random() * 4);
  var randomColor = buttonColors[number];
  gamePattern.push(randomColor);

  $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColor);


}

//gives a flash animation to the button when the user presses it
function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function() {
    $("#" + color).removeClass("pressed");
  }, 100);
}

//plays the sound that is sent
function playSound(key) {
  var audio = new Audio("sounds/" + key + ".mp3");
  audio.play();
}
