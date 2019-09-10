import $ from 'jquery';
import './css/base.scss';
import Game from '../src/Game.js';
import Round from './Round.js';
import Turn from './Turn.js';
import Puzzle from './Puzzle.js';
import Wheel from './Wheel.js';
import Player from './Player.js';
import domUpdates from './domUpdates';

let $player1 = $('.input--player1');
let $player2 = $('.input--player2');
let $player3 = $('.input--player3');

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

  // checkGameValidity([$player1, $player2, $player3]);
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
  domUpdates.appendPuzzle('.span--puzzle-display', `${round.puzzle.correct_answer}`);
  domUpdates.appendHTML(
    '.puzzle-category',
    `Category: ${round.puzzle.category}`
  );
  domUpdates.hideModal('.div--modal-setup');
  domUpdates.displayRoundNumber(game);
  domUpdates.updateCurrentPlayerDisplay(players[round.playerTurnIndex].name);
  console.log(round.puzzle.correct_answer)
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

function checkGameValidity(fields) {
  let checkFields = validateFields(fields);
  checkFields ? startTheGame() : domUpdates.giveFieldError(fields);
}

function validateFields(fields) {
  return fields.every(field => field.val() !== '');
}

$('.button--guess').click(event => {
  event.preventDefault();
  // var guessLetter = $('.input--player-guess').val();
  // var lettersUsed = alreadyUsedLettersCheck(guessLetter);
  // domUpdates.updateLettersUsed(lettersUsed);
  // console.log(guessLetter);
  // console.log(lettersUsed);
});

let wheelValue;
$('.button--spin').click(() => {
  event.preventDefault();
  wheelValue = wheel.randomizeWheelVal();
  domUpdates.displaySpinValue(wheelValue);
  if (wheelValue === 'BANKRUPT') {
    window.alert('BANKRUPT, YOUR ROUND MONEY IS NOW ZERO, NEXT PLAYER PLEASE');
    players[round.playerTurnIndex].resetRoundMoney();
    domUpdates.updateRoundScoreAfterGuess(round.playerTurnIndex, 0);
    round.updatePlayerIndex();
    domUpdates.updateCurrentPlayerDisplay(players[round.playerTurnIndex].name);
  }
  if (wheelValue === 'LOSE A TURN') {
    window.alert('YOU LOST A TURN, NEXT PLAYER PLEASE');
    round.updatePlayerIndex();
    domUpdates.updateCurrentPlayerDisplay(players[round.playerTurnIndex].name);
  }
});

$('.button--guess-solution').click(() => {
  event.preventDefault();
  
});

$('.button--buy-vowel').click(() => {
  event.preventDefault();
  let turnIndex = round.playerTurnIndex;
  let netScore = players[turnIndex].updateCurrentRoundMoney(-100);
  domUpdates.updateRoundScoreAfterGuess(turnIndex, netScore);
  let $playerGuess = $('.input--buy-vowel');
  let $playerGuessValue = $('.input--buy-vowel').val().toLowerCase();
  let vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
  round.guessedLetters.includes($playerGuessValue) ? domUpdates.alertInvalidEntry($playerGuess) : vowels.includes($playerGuessValue) ? checkGuess($playerGuessValue) : domUpdates.alertInvalidEntry($playerGuess);
  domUpdates.clearField($playerGuess);
});

$('.button--submit-solution').click(() => {
  event.preventDefault();
  let solution = $('.input--solution').val();
  round.checkSolve(solution)
  endRoundCheck()
  round.solvedQuestionMark ? domUpdates.hideModal('.div--modal-incorrect') : null;
  domUpdates.hideModal('.div--modal-solution');
});

$('.button--close-alert').click(() => {
  event.preventDefault();
  domUpdates.hideModal('.div--modal-incorrect');
})

$('.button--guess').click(() => {
  event.preventDefault();
  let $playerGuess = $('.input--player-guess');
  let $playerGuessValue = $('.input--player-guess').val().toLowerCase();
  let consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z']
  round.guessedLetters.includes($playerGuessValue) ? domUpdates.alertInvalidEntry($playerGuess) : consonants.includes($playerGuessValue) ? checkGuess($playerGuessValue) : domUpdates.alertInvalidEntry($playerGuess);
  domUpdates.clearField($playerGuess);
});

$('.input--player-guess').click(() => {
  domUpdates.removeError();
});

$('.input--buy-vowel').click(() => {
  domUpdates.removeError();
})

function checkGuess(letter) {
  let guessedLetter = letter;
  let scoreJustNow = round.checkGuess(guessedLetter, wheel.currentVal);
  let turnIndex = round.playerTurnIndex;
  let totalRoundScore = players[turnIndex].updateCurrentRoundMoney(scoreJustNow);
  var lettersUsed = alreadyUsedLettersCheck(guessedLetter);
  domUpdates.updateRoundScoreAfterGuess(turnIndex, totalRoundScore);
  round.updatePlayerIndex();
  domUpdates.updateCurrentPlayerDisplay(players[round.playerTurnIndex].name);
  domUpdates.updateLettersUsed(lettersUsed);
  round.checkSolveByLetter();
  endRoundCheck();
}
function endRoundCheck() {
  if (round.solvedQuestionMark) {
    console.log('round has ended!');
    console.log(turnIndex);

    let winnerTotal = players[turnIndex].updateTotalMoney(
      players[turnIndex].currentRoundMoney
    );

    domUpdates.updateTotalMoneyAfterSolve(turnIndex, winnerTotal);
    domUpdates.updateRoundScoreAfterSolve(players);
    round.endRoundCleanup();
    players.forEach(player => {
      player.resetRoundMoney();
      console.log(player.currentRoundMoney);
    });
    game.incrementRound();
    round = new Round(game.puzzles[game.currentRound]);
    // domUpdates.appendHTML(
    //   '.p--puzzle-display',
    //   `${round.puzzle.correct_answer}`
    // );
    domUpdates.appendPuzzle(
      '.span--puzzle-display',
      `${round.puzzle.correct_answer}`
    );

    domUpdates.appendHTML(
      '.puzzle-category',
      `Category: ${round.puzzle.category}`
    );
    domUpdates.displayRoundNumber(game);
  } else {
    return;
  }
}

function alreadyUsedLettersCheck(letter) {
  return round.storeGuess(letter);
}
