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

  appendPuzzle(element, puzzleAnswer) {
    let puzzleElem = '';
    let text = puzzleAnswer.toUpperCase().split(' ');
    text.forEach(word => {
      puzzleElem += `<div class="div--puzz-set">`;
      let ltrs = word.split('');
      ltrs.forEach(char => {
        if (char === '-' || char === '&') {
          puzzleElem += `</div><div class="div--puzz-set"><div class="symbol-container">
                          <span class="char symbol">${char}</span></div>
                          </div></div><div class="div--puzz-set">`;
        } else if (char === "'") {
          puzzleElem += `<span class="char-container"><span class="char symbol">${char}</span></span>`;
        } else {
          puzzleElem += `<span class="char-container"><span class="char letter hidden" data-id="${char}">${char}</span></span>`;
        }
      });
      puzzleElem += `</div >`;
    });
    $(element).html(puzzleElem);
  },

  appendNewElement(element, text) {
    $(text).after(element);
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

  unhideGuessedLetters(correctLetters) {
    correctLetters.forEach(letter => {
      $(`[data-id="${letter}"]`).removeClass('hidden');
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
  },

  giveFieldError(fields) {
    let filteredFields = fields.filter(field => field.val() === '');
    filteredFields.forEach(field =>
      this.appendNewElement(`<p>Field is required</p>`, field)
    );
  },

  alertInvalidEntry(field) {
    this.appendNewElement(`<p class="error">Invalid Entry</p>`, field);
  },

  clearField(field) {
    return field.val('');
  },

  removeError() {
    let $error = $('.error');
    $error !== undefined ? $error.remove() : null;
  },

  updateRoundScoreAfterSolve(players) {
    players.forEach(player => {
      $(`.player--roundscore${player.id}`).text(`Round Score: 0`);
    });
  },

  updateLettersUsed(letters) {
    // console.log(letters)
    $(`.player-used-letters`).text(letters);
  },

  updateCurrentPlayerDisplay(playerTurn) {
    $('.current-player').text(playerTurn);
  }
};

export default domUpdates;
