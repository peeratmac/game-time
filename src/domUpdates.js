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
  },

  appendPlayers(players) {
    players.forEach(player => {
      $(`.player--name${player.id}`).text(`${player.name}`);
      $(`.player--roundscore${player.id}`).text(
        `Round Score: ${player.currentRoundMoney}`
      );
      $(`.player--totalscore${player.id}`).text(
        `Total Score: ${player.totalMoney}`
      );
    });
  },

  displayRoundNumber(game) {
    $('.div--round-disp').text(game.currentRound);
  },

  updateRoundScoreAfterGuess(playerTurnIndex, score) {
    $(`.player--roundscore${playerTurnIndex + 1}`).text(
      `Round Score: ${score}`
    );
  },

  updateTotalMoneyAfterSolve(playerTurnIndex, score) {
    $(`.player--totalscore${playerTurnIndex + 1}`).text(
      `Total Score: ${score}`
    );
  }
};

export default domUpdates;
