"use strict";

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score_0 = document.querySelector("#score--0");
const score_1 = document.querySelector("#score--1");
const current_0 = document.querySelector("#current--0");
const current_1 = document.querySelector("#current--1");

const dice_image = document.querySelector(".dice");
const new_game_btn = document.querySelector(".btn--new");
const roll_dice_btn = document.querySelector(".btn--roll");
const hold_btn = document.querySelector(".btn--hold");

let activePlayer, currentScore, scores;
const init = function () {
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;

  score_0.textContent = 0;
  score_1.textContent = 0;
  current_0.textContent = 0;
  current_1.textContent = 0;
};
init();

const generateRandomDice = function () {
  const index = Math.floor(Math.random() * 6 + 1);
  dice_image.src = `./images/dice-${index}.png`;
  return index;
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

const userRollsDice = function () {
  const dice = generateRandomDice();
  if (dice === 1) {
    switchPlayer();
  } else {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  }
};

const hold = function () {
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  if (scores[activePlayer] >= 100) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--active");
  } else {
    switchPlayer();
  }
};

roll_dice_btn.addEventListener("click", userRollsDice);
hold_btn.addEventListener("click", hold);
