import Puzzle from "./Puzzle";
// import Game from '../test/Round-test.js';
// import Puzzle from './Puzzle.js'
import data from './data/sample-data.js';
import { truncate } from "fs";

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
    let indices = [];
    let answerArray = this.puzzle.correct_answer.split('');
    answerArray.forEach((char) => {
      indices.push(answerArray).findIndex(char => char === letter))
    })
    console.log(answerArray);
    console.log(indices);
  }

  // checkSolve() {

  // }


}

export default Round;
