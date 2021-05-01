'use strict';

//selecting the elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnHelp = document.querySelector('.btn--help');

let scores, activePlayer, currentScore, playing;

const init = function () {
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;

  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  btnHelp.classList.remove('hidden');
  document.getElementById(`name--0`).textContent = 'Player 1';
  document.getElementById(`name--1`).textContent = 'Player 2';
};

//Starting conditions
init();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(
    `current--${activePlayer}`
  ).textContent = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //get a random number for the dice roll
    let dice = Math.floor(Math.random() * 6 + 1);
    console.log(dice);

    //display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    btnHelp.classList.add('hidden');

    //check for a rolled 1 if true switch to other player if not add to score
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
      //display the currentScore
    } else {
      //switch to next player\
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //add current score to active player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //check if player score is 100
    if (scores[activePlayer] >= 100) {
      //if so finish game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      document.getElementById(`name--${activePlayer}`).textContent = `Player ${
        activePlayer + 1
      } Wins!`;

      diceEl.classList.add('hidden');
    } else {
      //if not switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  console.log('new game');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  init();
});

//messing with a modal
// Get the modal
const modal = document.getElementById('myModal');
const overlay = document.querySelector('.overlay');

// Get the button that opens the modal
//btnHelp is the button

// Get the <span> element that closes the modal
const span = document.getElementsByClassName('close')[0];

// When the user clicks on the button, open the modal
btnHelp.onclick = function () {
  modal.style.display = 'block';
  overlay.classList.remove('hidden');
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = 'none';
  overlay.classList.add('hidden');
};
//if the user clicks on the overlay close the modal
overlay.onclick = function () {
  modal.style.display = 'none';
  overlay.classList.add('hidden');
};

//if the user presses escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    modal.style.display = 'none';
    overlay.classList.add('hidden');
  }
});
