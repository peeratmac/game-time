import $ from 'jquery';
import './css/base.scss';
import Game from '../src/Game.js';
import Round from './Round.js';
import Turn from './Turn.js';
import Puzzle from './Puzzle.js';
import Wheel from './Wheel.js';
import Player from './Player.js';
import data from './data/sample-data.js';
import domUpdates from './domUpdates';

let game, round;
const data = fetch("https://fe-apps.herokuapp.com/api/v1/gametime/1903/wheel-of-fortune/data").then(data => data.json()).then(data => data.data.puzzles).catch(err => console.log(err));
const wheel = fetch("https://fe-apps.herokuapp.com/api/v1/gametime/1903/wheel-of-fortune/data").then(data => data.json()).then(data => data.data.wheel).catch(err => console.log(err));

$('.button--guess').click(event => {
  event.preventDefault();
  let $player1 = $('.input--player1').val();
  let $player2 = $('.input--player2').val();
  let $player3 = $('.input--player3').val();
  game = new Game(data);
  game.startGame($player1, $player2, $player3);
  round = new Round(game.puzzles[game.currentRound])
  $('.p--puzzle-display').text(`${round.puzzle.correct_answer}`)
  $('.p--puzzle-category').text(`${round.puzzle.category}`)
});