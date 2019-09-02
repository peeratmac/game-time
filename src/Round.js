import Puzzle from './Puzzle';
// import Game from '../test/Round-test.js';
// import Puzzle from './Puzzle.js'
import data from './data/sample-data.js';
// import { truncate } from 'fs';

class Round {
  constructor(puzzle) {
    this.puzzle = puzzle;
    this.playerTurnIndex = 0;
    this.roundStandings = [];
    this.guessedLetters = [];
    this.correctIndicesArr = [];
  }

  storeGuess(letter) {
    this.guessedLetters = [...this.guessedLetters, letter];
  }

  startRound() {
    let puzzleClass = new Puzzle(data);
    this.puzzle = puzzleClass.newPuzzle;
    this.guessedLetters = [];
    // update round standings with each player's score
  }

  endRound() {
    this.guessedLetters = [];
    this.correctIndicesArr = [];
    return this.roundStandings;
  }

  checkGuess(letter) {
    let answerArray = this.puzzle.correct_answer.split('');
    answerArray.forEach((char, index) => {
      char.toUpperCase() === letter.toUpperCase() ? this.correctIndicesArr.push(index) : null;
    });
    this.checkSolve();
  }

  checkSolve(fullPlayerGuess) {
    let noSpacesArr = this.puzzle.correct_answer.split('').filter(elem => elem !== ' ');
    if (this.correctIndicesArr.length === noSpacesArr.length) {
      this.endRound();
      return true
    } else if (fullPlayerGuess !== undefined && (this.puzzle.correct_answer.toUpperCase() === fullPlayerGuess.toUpperCase())) {
      // ! going to need something to update money/score of the player
      this.endRound()
      return true;
    } else {
      return false;
    }
  }
}

export default Round;
