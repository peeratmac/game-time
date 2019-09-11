import $ from 'jquery';
import './css/base.scss';
import Game from '../src/Game.js';
import Round from './Round.js';
import Wheel from './Wheel.js';
import Player from './Player.js';
import domUpdates from './domUpdates';

let $player1 = $('.input--player1');
let $player2 = $('.input--player2');
let $player3 = $('.input--player3');
let wheelValue;
let turnIndex;
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
  checkGameValidity([$player1, $player2, $player3]);
});

function startTheGame() {
  players = instantiatePlayers();
  game = new Game(players, data);
  game.getPuzzles();
  round = new Round(game.puzzles[game.currentRound]);
  wheel = new Wheel(wheelData);
  domUpdates.appendPlayers(players);
  domUpdates.appendPuzzle(
    '.span--puzzle-display',
    `${round.puzzle.correct_answer}`
  );
  domUpdates.appendHTML(
    '.puzzle-category',
    `Category: ${round.puzzle.category}`
  );
  domUpdates.hideModal('.div--modal-setup');
  domUpdates.displayRoundNumber(game);
  domUpdates.updateCurrentPlayerDisplay(players[round.playerTurnIndex].name);
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

$('.button--spin').click(() => {
  event.preventDefault();
  domUpdates.enableBtn([$('.button--guess-solution'), $('.button--buy-vowel'), $('.button--guess')]);
  domUpdates.disableBtn([$('.button--spin')]);
  wheelValue = wheel.randomizeWheelVal();
  domUpdates.displaySpinValue(wheelValue);
  if (wheelValue === 'BANKRUPT') {
    domUpdates.disableBtn([$('.button--guess-solution'), $('.button--buy-vowel'), $('.button--guess')]);
    domUpdates.enableBtn([$('.button--spin')]);
    window.alert('BANKRUPT, YOUR ROUND MONEY IS NOW ZERO, NEXT PLAYER PLEASE');
    players[round.playerTurnIndex].resetRoundMoney();
    domUpdates.updateRoundScoreAfterGuess(round.playerTurnIndex, 0);
    round.updatePlayerIndex();
    domUpdates.updateCurrentPlayerDisplay(players[round.playerTurnIndex].name);
  }
  if (wheelValue === 'LOSE A TURN') {
    domUpdates.disableBtn([$('.button--guess-solution'), $('.button--buy-vowel'), $('.button--guess')]);
    domUpdates.enableBtn([$('.button--spin')]);
    window.alert('YOU LOST A TURN, NEXT PLAYER PLEASE');
    round.updatePlayerIndex();
    domUpdates.updateCurrentPlayerDisplay(players[round.playerTurnIndex].name);
  }
});

$('.button--guess-solution').click(() => {
  event.preventDefault();
  domUpdates.hideModal('.div--modal-solution');
});


$('.button--buy-vowel').click(() => {
  event.preventDefault();
  domUpdates.disableBtn([$('.button--guess-solution'), $('.button--buy-vowel'), $('.button--guess')]);
  domUpdates.enableBtn([$('.button--spin')]);
  turnIndex = round.playerTurnIndex;
  let netScore = players[turnIndex].updateCurrentRoundMoney(-100);
  domUpdates.updateRoundScoreAfterGuess(turnIndex, netScore);
  let $playerGuess = $('.input--buy-vowel');
  let $playerGuessValue = $('.input--buy-vowel')
    .val()
    .toLowerCase();
  let vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
  round.guessedLetters.includes($playerGuessValue)
    ? domUpdates.alertInvalidEntry($playerGuess)
    : vowels.includes($playerGuessValue)
      ? checkGuess($playerGuessValue)
      : domUpdates.alertInvalidEntry($playerGuess);
  domUpdates.clearField($playerGuess);
});

$('.button--submit-solution').click(() => {
  event.preventDefault();
  let solution = $('.input--solution').val();
  round.checkSolve(solution);
  endRoundCheck();
  round.solvedQuestionMark
    ? domUpdates.hideModal('.div--modal-incorrect')
    : null;
  domUpdates.hideModal('.div--modal-solution');
  domUpdates.clearField($('.input--solution'));
});

$('.button--close-alert').click(() => {
  event.preventDefault();
  domUpdates.hideModal('.div--modal-incorrect');
});

$('.button--close-winner').click(() => {
  event.preventDefault();
  domUpdates.hideModal('.div--modal-winner');
  startTheGame();
});

$('.button--guess').click(() => {
  event.preventDefault();
  let $playerGuess = $('.input--player-guess');
  let $playerGuessValue = $('.input--player-guess')
    .val()
    .toLowerCase();
  let consonants = [
    'b',
    'c',
    'd',
    'f',
    'g',
    'h',
    'j',
    'k',
    'l',
    'm',
    'n',
    'p',
    'q',
    'r',
    's',
    't',
    'v',
    'w',
    'x',
    'z',
    '-'
  ];
  domUpdates.disableBtn([$('.button--guess-solution'), $('.button--buy-vowel'), $('.button--guess')]);
  domUpdates.enableBtn([$('.button--spin')]);
  round.guessedLetters.includes($playerGuessValue) ? domUpdates.alertInvalidEntry($playerGuess) : consonants.includes($playerGuessValue) ? checkGuess($playerGuessValue) : domUpdates.alertInvalidEntry($playerGuess);
  domUpdates.clearField($playerGuess);
});

$('.input--player-guess').click(() => {
  domUpdates.removeError();
});

$('.input--buy-vowel').click(() => {
  domUpdates.removeError();
});

function checkGuess(letter) {
  console.log(round.puzzle.correct_answer)
  let guessedLetter = letter;
  let scoreJustNow = round.checkGuess(guessedLetter, wheel.currentVal);
  turnIndex = round.playerTurnIndex;
  let totalRoundScore = players[turnIndex].updateCurrentRoundMoney(
    scoreJustNow
  );
  var lettersUsed = alreadyUsedLettersCheck(guessedLetter);
  domUpdates.updateRoundScoreAfterGuess(turnIndex, totalRoundScore);
  domUpdates.updateLettersUsed(lettersUsed);
  domUpdates.unhideGuessedLetters(round.correctLetters);
  round.checkSolveByLetter();
  endRoundCheck();
}

function endRoundCheck() {
  turnIndex = round.playerTurnIndex;
  if (round.solvedQuestionMark && game.currentRound < 5) {
    let winnerTotal = players[turnIndex].updateTotalMoney(
      players[turnIndex].currentRoundMoney
    );
    domUpdates.updateTotalMoneyAfterSolve(turnIndex, winnerTotal);
    domUpdates.updateRoundScoreAfterSolve(players);
    round.endRoundCleanup();
    players.forEach(player => {
      player.resetRoundMoney();
    });
    game.incrementRound();
    round = new Round(game.puzzles[game.currentRound]);
    domUpdates.appendPuzzle('.span--puzzle-display', `${round.puzzle.correct_answer}`);
    domUpdates.updateLettersUsed([]);        
    endGameCheck();
    domUpdates.appendHTML('.puzzle-category', `Category: ${round.puzzle.category}`);
    domUpdates.displayRoundNumber(game);
    round.updatePlayerIndex();
    domUpdates.updateCurrentPlayerDisplay(players[round.playerTurnIndex].name);
  } else {
    round.updatePlayerIndex();
    domUpdates.updateCurrentPlayerDisplay(players[round.playerTurnIndex].name);
    endGameCheck();
    return;
  }
}

function endGameCheck() {
  if (game.currentRound === 5) {
    let winner = game.getWinnerAtTheEnd();
    domUpdates.appendHTML('.p--winner-alert', `${winner} is the winner!`);
    domUpdates.hideModal($('.div--modal-winner'));
  } else {
    return
  }
}

function alreadyUsedLettersCheck(letter) {
  return round.storeGuess(letter);
}

$('.span--new-game').click(() => {
  startTheGame();
});
