import Puzzle from "./Puzzle";

// import Game from '../test/Round-test.js';
// import Puzzle from './Puzzle.js'
import data from './data/sample-data.js';

class Round extends Puzzle {
  constructor(puzzle) {
    super()
    this.puzzle = puzzle;
    this.playerTurnIndex = 0;
    this.roundStandings = [];
    this.guessedLetters = [];
  }

  storeGuess(letter) {
    this.guessedLetters = [...this.guessedLetters, letter];
  }

  startRound() {
    let puzzleClass = new Puzzle(data)
    let puzzleBank = super.choosePuzzleBank();
    this.puzzle = super.choosePuzzle()
    this.guessedLetters = [];
  }
}

export default Round;
