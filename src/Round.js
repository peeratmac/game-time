class Round {
  constructor(puzzle, players) {
    this.puzzle = puzzle;
    this.playerTurnIndex = 0;
    this.roundStandings = players
    this.guessedLetters = [];
    this.correctIndicesArr = [];
  }

  storeGuess(letter) {
    this.guessedLetters = [...this.guessedLetters, letter];
  }

  startRound() {
    // ! I don't think we need this method since we are instantiating from the Game Class
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

  checkGuess(letter, value) {
    let currentLetters = this.correctIndicesArr.length;
    let answerArray = this.puzzle.correct_answer.split('');
    answerArray.forEach((char, index) => {
      char.toUpperCase() === letter.toUpperCase()
        ? this.correctIndicesArr.push(index)
        : null;
    });
    this.calculateScore(currentLetters, value);
  }

  calculateScore(num, value) {
    let numberGuessed = this.correctIndicesArr.length - num;
    let score = numberGuessed * value;
    return score;
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

  updateRoundStandings(playerArg) {
    this.roundStandings.map((player) => {
      if (player.name === playerArg.name) {
        player.currentRoundMoney = playerArg.currentRoundMoney;
      }
    })
  }

  updateGameStandings(gameClass) {
    this.roundStandings = this.roundStandings.sort((a, b) => {
      return b.currentRoundMoney - a.currentRoundMoney;
    });
    let winner = this.roundStandings[0];
    gameClass.getWinnerThisRound(winner);
  }
}

export default Round;
