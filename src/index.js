import $ from 'jquery';
import './css/base.scss';
import Game from '../src/Game.js';
import Round from './Round.js';
import Turn from './Turn.js';
import Puzzle from './Puzzle.js';
import Wheel from './Wheel.js';
import Player from './Player.js';
import domUpdates from './domUpdates';

let game, round, wheel, players;
const data = fetch(
  'https://fe-apps.herokuapp.com/api/v1/gametime/1903/wheel-of-fortune/data'
)
  .then(data => data.json())
  .then(data => data.data.puzzles)
  .catch(err => console.log(err));
let wheelData = fetch(
  'https://fe-apps.herokuapp.com/api/v1/gametime/1903/wheel-of-fortune/data'
)
  .then(data => data.json())
  .then(data => data.data.wheel)
  .catch(err => console.log(err));

$('.button--start').click(event => {
  event.preventDefault();

  startTheGame();

  // game.startGame($player1, $player2, $player3);
});

function startTheGame() {
  players = instantiatePlayers();

  game = new Game(players, data);

  game.getPuzzles();

  round = new Round(game.puzzles[game.currentRound]);

  wheel = new Wheel(wheelData);

  domUpdates.appendPlayers(players);
  domUpdates.appendHTML('.p--puzzle-display', `${round.puzzle.correct_answer}`);
  domUpdates.hideModal('.div--modal-setup');
  domUpdates.displayRoundNumber(game);
}

function instantiatePlayers() {
  let players = [];
  players.push(
    new Player(1, $('.input--player1').val() || 'Player 1'),
    new Player(2, $('.input--player2').val() || 'Player 2'),
    new Player(3, $('.input--player3').val() || 'Player 3')
  );
  return players;
}

$('.button--guess').click(event => {
  event.preventDefault();
  var guessLetter = $('.input--player-guess').val();
  console.log(guessLetter);
});

$('.button--buy-vowel').click(event => {
  event.preventDefault();
});

let wheelValue;
$('.button--spin').click(() => {
  event.preventDefault();
  wheelValue = wheel.randomizeWheelVal();
  domUpdates.displaySpinValue(wheelValue);
  console.log(wheelValue);
});

$('.button--buy-vowel').click(() => {
  event.preventDefault();
  var wantedLetter = $('.input--buy-vowel').val();
  console.log(wantedLetter);
});

$('.button--guess-solution').click(() => {
  event.preventDefault();
});

let turnIndex;
$('.button--guess').click(() => {
  event.preventDefault();
  var guessedLetter = $('.input--player-guess').val();
  var scoreJustNow = round.checkGuess(guessedLetter, wheelValue);
  turnIndex = round.playerTurnIndex;

  let totalRoundScore = players[turnIndex].updateCurrentRoundMoney(
    scoreJustNow
  );

  domUpdates.updateRoundScoreAfterGuess(turnIndex, totalRoundScore);

  round.updatePlayerIndex();

  endRoundCheck();
});

function endRoundCheck() {
  round.checkSolveByLetter();
  if (round.solvedQuestionMark) {
    console.log('round has ended!');
    console.log(turnIndex);

    let winnerTotal = players[turnIndex].updateTotalMoney(
      players[turnIndex].currentRoundMoney
    );

    domUpdates.updateTotalMoneyAfterSolve(turnIndex, winnerTotal);

    round.endRoundCleanup();
    game.incrementRound();
    round = new Round(game.puzzles[game.currentRound]);
    domUpdates.appendHTML(
      '.p--puzzle-display',
      `${round.puzzle.correct_answer}`
    );
    domUpdates.displayRoundNumber(game);
  } else {
    return;
  }
}
