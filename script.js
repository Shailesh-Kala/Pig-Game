"use strict";
// Rule
const guide = function () {
  alert(`1. If the value of dice is 1, then your current score will be 0.
  
2. If you click the hold button, your current score will be added to your 
total score and then it will be the next player's turn to play.

3. Which will have the first total score of 100. He will be the winner.`);
};

// Selecting Elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
let score0El = document.querySelector("#score--0");
let score1El = document.getElementById("score--1");
let current0El = document.getElementById("current--0");
let current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnRule = document.querySelector(".btn--rule");

//Starting conditions
let scores, currentScore, activePlayer, playing;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  diceEl.classList.add("hidden");
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};
guide();

//Rolling dice functionally
btnRoll.addEventListener("click", function () {
  if (playing === true) {
    // 1.Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2.Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `../pigGame/img/dice-${dice}.png`;

    // 3.Check for Roll
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing === true) {
    // 1. add current score to active player score
    scores[activePlayer] += currentScore;
    // score[1] = score[1]+ currentscore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. check if player's score is <= 100
    if (scores[activePlayer] >= 100) {
      //finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // 3. switch to next player
      switchPlayer();
    }
  }
});
btnRule.addEventListener("click", function () {
  guide();
});

btnNew.addEventListener("click", function () {
  guide();
  init();
});
