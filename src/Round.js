import Puzzle from './Puzzle';
// import Game from '../test/Round-test.js';
// import Puzzle from './Puzzle.js'
import data from './data/sample-data.js';
import { truncate } from 'fs';

class Round {
  constructor(puzzle) {
    this.puzzle = puzzle;
    this.playerTurnIndex = 0;
    this.roundStandings = [];
    this.guessedLetters = [];
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
    return this.roundStandings;
  }

  checkGuess(letter) {
    // checkSolve();
    console.log(this.puzzle['correct_answer']);
    let indicesArray = [];
    let answerArray = this.puzzle.correct_answer.split('');
    answerArray.forEach((char, index) => {
      char === letter ? indicesArray.push(index) : null;
    });
  }

  checkSolve(fullPlayerGuess) {
    if (
      this.puzzle.correct_answer.toUpperCase() === fullPlayerGuess.toUpperCase()
    ) {
      // ! going to need something to update money/score of the player
      this.guessedLetters = [];
      return true;
    } else {
      return false;
    }
  }
}

export default Round;
