var userClickedPattern= [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

function playSound(name){
    var playSound = new Audio("sounds/" + name + ".mp3");
    playSound.play();
};

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
    
});




$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer();
});



function nextSequence(){
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
};

function animatePress(currentColour){
    var idOfPressed = $("#"+currentColour);
    idOfPressed.addClass("pressed");
    setTimeout(function(){
        idOfPressed.removeClass("pressed")}, 100);

};

function checkAnswer(currentLevel){
    var lastIndex = userClickedPattern.length - 1;
    if(userClickedPattern[lastIndex] == gamePattern[lastIndex]){
        console.log("success");
        if(lastIndex == gamePattern.length - 1){
            console.log("finiti");
            setTimeout(nextSequence, 500);
            userClickedPattern = [];
        }
    }else{
        console.log("wrong");
        var wrongSound = new Audio("sounds/wrong.mp3");
        wrongSound.play();
            $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")}, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
        
    };

    function startOver(){
       level = 0;
       gamePattern = [];
       started = false;
       userClickedPattern = [];
    }
    
};




