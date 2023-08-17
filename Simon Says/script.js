"use strict";

//setting elements to variables
/** @type {HTMLDivElement} */
const startBtn = document.querySelector(".start");
/** @type {HTMLDivElement} */
const redBtn = document.querySelector(".redSector");
/** @type {HTMLDivElement} */
const greenBtn = document.querySelector(".greenSector");
/** @type {HTMLDivElement} */
const yellowBtn = document.querySelector(".yellowSector");
/** @type {HTMLDivElement} */
const blueBtn = document.querySelector(".blueSector");
/** @type {HTMLSpanElement} */
const displayScore = document.querySelector(".score");
/** @type {HTMLSpanElement} */
const displayHiScore = document.querySelector(".hiScore");
/** @type {HTMLParagraphElement} */
const message = document.querySelector(".message");

//setting audios
const redBeep = new Audio("redBeep.mp3");
const greenBeep = new Audio("greenBeep.mp3");
const yellowBeep = new Audio("yellowBeep.mp3");
const blueBeep = new Audio("blueBeep.mp3");
const correctBeep = new Audio("correctBeep.wav");
const wrongBeep = new Audio("wrongBeep.mp3");
const hiScoreBeep = new Audio("hiScore.mp3");

//setting other variables

var hiScore = 0;
var playing = false;
var clicked = false;
var sequence = [];
var responses = [];
var counter = 0;

//reset all variables
function Reset() {
  playing = false;
  clicked = false;
  sequence = [];
  responses = [];
  counter = 0;
  message.textContent = "Press the grey button to start a new game!";
}

//functions for changing button colours
function redOn() {
  redBtn.style.backgroundColor = "#e45252";
}
function redOff() {
  redBtn.style.backgroundColor = "#ac0000";
}
function greenOn() {
  greenBtn.style.backgroundColor = "#42de29";
}
function greenOff() {
  greenBtn.style.backgroundColor = "#007600";
}
function yellowOn() {
  yellowBtn.style.backgroundColor = "#fcff27";
}
function yellowOff() {
  yellowBtn.style.backgroundColor = "#bbbb00";
}
function blueOn() {
  blueBtn.style.backgroundColor = "#3344fe";
}
function blueOff() {
  blueBtn.style.backgroundColor = "#00009b";
}

//functions for flashing buttons with audio
const redFlash = function () {
  redBeep.currentTime = 0;
  redBeep.play();
  redOn();
  setTimeout(function () {
    redOff();
  }, 350);
};
const greenFlash = function () {
  greenBeep.currentTime = 0;
  greenBeep.play();
  greenOn();
  setTimeout(function () {
    greenOff();
  }, 350);
};
const yellowFlash = function () {
  yellowBeep.currentTime = 0;
  yellowBeep.play();
  yellowOn();
  setTimeout(function () {
    yellowOff();
  }, 350);
};
const blueFlash = function () {
  blueBeep.currentTime = 0;
  blueBeep.play();
  blueOn();
  setTimeout(function () {
    blueOff();
  }, 350);
};

//function that displays current sequence
const flashSequence = function (sequence) {
  var i = 0;
  const flashing = setInterval(function () {
    if (sequence[i] == 0) redFlash();
    if (sequence[i] == 1) greenFlash();
    if (sequence[i] == 2) yellowFlash();
    if (sequence[i] == 3) blueFlash();
    i++;
    if (i == sequence.length) clearInterval(flashing);
  }, 500);
};

//function that is called when incorrect button is pressed
const wrongAnswer = function () {
  wrongBeep.play();
  if (displayScore.textContent > hiScore) {
    hiScore = displayScore.textContent;
    displayHiScore.textContent = hiScore;
    setTimeout(function () {
      hiScoreBeep.play();
    }, 1000);
  }
  displayScore.textContent = 0;
};

//starting new round
const newRound = function () {
  responses = [];
  sequence.push(Math.trunc(Math.random() * 4));
  flashSequence(sequence);
  for (var i = 0; i < sequence.length; i++) {
    checkAnswer();
  }
};

//checking if answer is correct

function checkAnswer() {
  if (clicked) {
    if (responses[counter] != sequence[counter]) {
      wrongAnswer();
      Reset();
    } else if (responses[counter] == sequence[counter]) {
      clicked = false;

      counter++;
      if (responses.length == sequence.length) {
        setTimeout(function () {
          correctBeep.play();
          displayScore.textContent = sequence.length;
          counter = 0;
        }, 200);

        setTimeout(newRound, 500);
      }
    }
  } else setTimeout(checkAnswer, 200);
}

//event listeners
startBtn.addEventListener("click", function () {
  playing = !playing;
  sequence = [];
  if (playing) {
    newRound();
    message.textContent =
      "Game in progress! Press the grey button at any time to quit!";
  }
  if (!playing) Reset();
});

redBtn.addEventListener("click", function () {
  redFlash();
  if (playing) {
    responses.push(0);
    clicked = true;
  }
});
greenBtn.addEventListener("click", function () {
  greenFlash();
  if (playing) {
    responses.push(1);
    clicked = true;
  }
});
yellowBtn.addEventListener("click", function () {
  yellowFlash();
  if (playing) {
    responses.push(2);
    clicked = true;
  }
});
blueBtn.addEventListener("click", function () {
  blueFlash();
  if (playing) {
    responses.push(3);
    clicked = true;
  }
});
