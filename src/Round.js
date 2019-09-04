import Puzzle from './Puzzle.js';
import Game from './Game.js';


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
    // let puzzleClass = new Puzzle(data.puzzles);
    // puzzleClass.choosePuzzleBank();
    // puzzleClass.setPuzzle();
    // this.puzzle = puzzleClass.newPuzzle;
    this.guessedLetters = [];
  }

  endRound(game) {
    this.resolveScores(game);
    this.updateGameStandings(game);
    this.guessedLetters = [];
    this.correctIndicesArr = [];
  }

  checkGuess(letter) {
    let answerArray = this.puzzle.correct_answer.split('');
    answerArray.forEach((char, index) => {
      char.toUpperCase() === letter.toUpperCase()
        ? this.correctIndicesArr.push(index)
        : null;
    });
    this.checkSolveByLetter();
  }

  checkSolveByLetter() {
    let noSpacesArr = this.puzzle.correct_answer.split('')
      .filter(elem => elem !== ' ');
    if (this.correctIndicesArr.length === noSpacesArr.length) {
      // this.endRound();
      return true;
    } else {
      return false;
    }
  }

  checkSolve(fullPlayerGuess) {
    if (fullPlayerGuess !== undefined && this.puzzle.correct_answer.toUpperCase() === fullPlayerGuess.toUpperCase()) {
      // this.endRound();
      return true;
    }
  }

  resolveScores(gameClass) {
    return gameClass.getWinnerAtTheEnd();
  }

  updateGameStandings(gameClass) {
    // let gameClass = new Game();
    // gameClass.instantiatePlayers('Chris', 'Peerat', 'Victor');
    // gameClass.players[0].currentRoundMoney = 800;
    // gameClass.players[1].currentRoundMoney = 700;
    // gameClass.players[2].currentRoundMoney = 750;
    return gameClass.getWinnerThisRound();
  }
}

export default Round;
