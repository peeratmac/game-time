import $ from 'jquery';
import './css/base.scss';
import Game from '../src/Game.js';
import Round from './Round.js';
import Turn from './Turn.js';
import Puzzle from './Puzzle.js';
import Wheel from './Wheel.js';
import Player from './Player.js';
import data from './data/sample-data';
import domUpdates from './domUpdates';

let game, round, wheel;
// const data = fetch(
//   'https://fe-apps.herokuapp.com/api/v1/gametime/1903/wheel-of-fortune/data'
// )
//   .then(data => data.json())
//   .then(data => data.data.puzzles)
//   .catch(err => console.log(err));
// const wheel = fetch(
//   'https://fe-apps.herokuapp.com/api/v1/gametime/1903/wheel-of-fortune/data'
// )
//   .then(data => data.json())
//   .then(data => data.data.wheel)
//   .catch(err => console.log(err));

$('.button--start').click(event => {
  event.preventDefault();
  let $player1 = $('.input--player1').val();
  let $player2 = $('.input--player2').val();
  let $player3 = $('.input--player3').val();
  game = new Game(data);
  wheel = new Wheel(data);
  game.startGame($player1, $player2, $player3);
  round = new Round(game.puzzles[game.currentRound]);
  domUpdates.appendHTML('.p--puzzle-display', `${round.puzzle.correct_answer}`);
  domUpdates.hideModal('.div--modal-setup');
});

$('.button--guess').click(event => {
  event.preventDefault();
  var guessLetter = $('.input--player-guess').val();
  console.log(guessLetter);
});

$('.button--buy-vowel').click(event => {
  event.preventDefault();
});

$('.button--spin').click(() => {
  event.preventDefault();
  var wheelValue = wheel.randomizeWheelVal();
  domUpdates.displaySpinValue(wheelValue);
  // console.log(wheel.randomizeWheelVal());
});

$('.button--buy-vowel').click(() => {
  event.preventDefault();
  var wantedLetter = $('.input--buy-vowel').val();
  console.log(wantedLetter);
});

$('.button--guess-solution').click(() => {
  event.preventDefault();
});