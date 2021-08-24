buttonList = ["blue", "red", "yellow", "green"];
gameSequence = [];
userSelectedSequence = [];
userScores = [0];

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonList[randomNumber];
    gameSequence.push(randomChosenColor);
    var buttonName = "#" + randomChosenColor;
    var buttonToSelect = $(buttonName);
    buttonToSelect.css("opacity", "0.2");
    playSound(randomChosenColor);
    setTimeout(function() {
        buttonToSelect.animate({opacity: 1});
    }, 1);
    var levelDisplay = $("h1");
    levelDisplay.text("Level " + level);
    level++;
}

function playSound(name) {
    var source = "sounds/" + name + ".mp3";
    var soundToBePlayed = new Audio(source);
    soundToBePlayed.play();
}

function animateClick(currentColor){
    var idOfElement = currentColor;
    var pressedButton = $("#" + idOfElement);
    pressedButton.addClass("pressed");
    setTimeout(function() {
        pressedButton.removeClass("pressed");
    }, 1.2)
}

var timeOut = 1000;
var timeKeyWasPressed = -1;

$(".btn").on("click", function(){
    var userSelectedButton = this.id;
    userSelectedSequence.push(userSelectedButton);
    playSound(userSelectedButton);
    console.log()
    animateClick(userSelectedButton);

    var highestScoreOfPlayer = Math.max(...userScores);
    $("#highest-score").text(highestScoreOfPlayer);

    timeKeyWasPressed ++;
    var buttonPressedByUser = this.id;
    var lastElementIndex = gameSequence.length - 1;
    var gamePatternLast = gameSequence[lastElementIndex];
    var numberOfPresses = userSelectedSequence.length;
    var numberOfGame = gameSequence.length;
    var buttonExpectedToBePressed = gameSequence[timeKeyWasPressed];
    if (gameHasStarted) {
        if(numberOfPresses === numberOfGame) {
            if(buttonPressedByUser === gamePatternLast) {
                userScores.push(level-1);
                setTimeout(function() {
                    nextSequence();
                    userSelectedSequence = [];
                    timeKeyWasPressed = -1;
                }, timeOut);
            } else {
                timeOut = 1000;
                timeKeyWasPressed = -1;
                userSelectedSequence = [];
                gameSequence = [];
                level = 0;
                keyPressNumber = 0;
                $("body").css("background-color", "red");
                playSound("wrong");
                setTimeout(function() {
                    $("body").css("background-color", "#011F3F");
                }, 400);
                $("#level-title").text("Game Over, Press any Key to Restart!");

                $("#gameStarter").removeClass("display-none");
                $("#gameStarter").text("Restart");
            }
        } else if(buttonPressedByUser !== buttonExpectedToBePressed) {
            timeOut = 1000;
            timeKeyWasPressed = -1;
            userSelectedSequence = [];
            gameSequence = [];
            level = 0;
            keyPressNumber = 0;
            $("body").css("background-color", "red");
            playSound("wrong");
            setTimeout(function() {
                $("body").css("background-color", "#011F3F");
            }, 400);
            $("#level-title").text("Game Over, Press any Key to Restart!");

            $("#gameStarter").removeClass("display-none");
            $("#gameStarter").text("Restart");
        }
    }
})

var keyPressNumber = 0;
var level = 0;
var gameHasStarted = false;

$(document).keydown(function() {
    keyPressNumber ++;
    level++;
    gameHasStarted = true;
    if(keyPressNumber === 1) {
        nextSequence();
        userSelectedSequence = [];
    }

    $("#gameStarter").addClass("display-none");
});

$("#gameStarter").click(() => {
    keyPressNumber ++;
    level++;
    gameHasStarted = true;
    if(keyPressNumber === 1) {
        nextSequence();
        userSelectedSequence = [];
    }

    $("#gameStarter").addClass("display-none");
});












