import $ from 'jquery';
// import Game from '../src/Game.js';
// import Round from './Round.js';
// import Turn from './Turn.js';
// import Puzzle from './Puzzle.js';
// import Wheel from './Wheel.js';
// import Player from './Player.js';
// import data from './data/sample-data.js';

const domUpdates = {
  appendHTML(element, text) {
    $(element).text(text);
  },

  hideModal(element) {
    $(element).toggle();
    $('.div--modal-background').toggle();
  },

  displaySpinValue(wheelValue) {
    $('.spin-value').text(wheelValue);
  }
};

export default domUpdates;
