const roll = document.querySelector('.btn--roll');
const dice = document.querySelector('.dice');
const restart = document.querySelector('.btn--new');
const hold = document.querySelector('.btn--hold');

const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

let scores, currentScore, activePlayer, playing;

function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0.innerHTML = 0;
  score1.innerHTML = 0;
  current0.innerHTML = 0;
  current1.innerHTML = 0;

  dice.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
}

init();

function changePlayer() {
  document.querySelector(`#current--${activePlayer}`).innerHTML = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

roll.addEventListener('click', () => {
  if (playing) {
    let diceScore = Math.floor(Math.random() * 6 + 1);
    dice.src = `dice-${diceScore}.png`;

    dice.classList.remove('hidden');

    if (diceScore !== 1) {
      currentScore += diceScore;
      document.querySelector(`#current--${activePlayer}`).innerHTML =
        currentScore;
    } else {
      changePlayer();
    }
  }
});

hold.addEventListener('click', () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    currentScore = 0;

    document.querySelector(`#score--${activePlayer}`).innerHTML =
      scores[activePlayer];
    document.querySelector(`#current--${activePlayer}`).innerHTML = 0;

    if (scores[activePlayer] >= 100) {
      playing = false;

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document.querySelector('.dice').classList.add('hidden');
    }
  }
});

restart.addEventListener('click', init);
