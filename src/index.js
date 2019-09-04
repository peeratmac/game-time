// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';
import Game from '../src/Game.js';
import Round from './Round.js';
import Turn from './Turn.js';
import Puzzle from './Puzzle.js';
import Wheel from './Wheel.js';
import Players from './Players.js';
import data from './data/sample-data.js';
import domUpdates from './domUpdates';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
$('document').ready(function() {});
let game;

function startGame(p1, p2, p3) {
  const player1 = new Players(1, p1);
  const player2 = new Players(2, p2);
  const player3 = new Players(3, p3);
  game = new Game([player1, player2, player3]);
}

$('.button--guess').click(event => {
  event.preventDefault();
  let $p1Name = $('.input--player1').val();
  let $p2Name = $('.input--player2').val();
  let $p3Name = $('.input--player3').val();
  startGame($p1Name, $p2Name, $p3Name);
  console.log(game);
});

console.log(game);

// console.log('This is the JavaScript entry file - your code begins here.');
