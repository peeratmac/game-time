class Round {
  constructor(puzzle, players) {
    this.puzzle = puzzle;
    this.playerTurnIndex = 0;
    this.players = players;
    this.guessedLetters = [];
    this.correctIndicesArr = [];
    this.correctLetters = [];
    this.solvedQuestionMark = false;
  }

  storeGuess(letter) {
    this.guessedLetters = [...this.guessedLetters, letter];
    return this.guessedLetters;
  }

  endRoundCleanup() {
    this.guessedLetters = [];
    this.correctIndicesArr = [];
    this.playerTurnIndex = 0;
    this.solvedQuestionMark = false;
  }

  endRound(game) {
    this.resolveScores(game);
    this.guessedLetters = [];
    this.correctIndicesArr = [];
  }

  checkGuess(letter, value) {
    let currentLetters = this.correctIndicesArr.length;
    let answerArray = this.puzzle.correct_answer.split('');
    answerArray.forEach((char, index) => {
      if (char.toUpperCase() === letter.toUpperCase()) {
        this.correctIndicesArr.push(index);
        this.correctLetters.push(letter.toUpperCase());
      } else {
        return null
      }
    });

    return this.calculateScore(currentLetters, value);
  }

  updatePlayerIndex() {
    if (this.playerTurnIndex === 2) {
      this.playerTurnIndex = 0;
    } else {
      this.playerTurnIndex++;
    }
  }

  calculateScore(num, value) {
    let numberGuessed = this.correctIndicesArr.length - num;
    let score = numberGuessed * value;
    return score;
  }

  buyVowel(playerArg) {
    return (playerArg.currentRoundMoney += -100);
  }

  checkSolveByLetter() {
    let noSpacesArr = this.puzzle.correct_answer
      .split('')
      .filter(elem => elem !== ' ');
    if (this.correctIndicesArr.length === noSpacesArr.length) {
      this.solvedQuestionMark = true;
      return this.solvedQuestionMark;
    } else {
      this.solvedQuestionMark = false;
      return this.solvedQuestionMark;
    }
  }

  checkSolve(fullPlayerGuess) {
    if (fullPlayerGuess !== undefined && this.puzzle.correct_answer.toUpperCase() === fullPlayerGuess.toUpperCase()) {
      this.solvedQuestionMark = true;
      return this.solvedQuestionMark;
    } else {
      this.solvedQuestionMark = false;
      return this.solvedQuestionMark;
    }
  }

  resolveScores(gameClass) {
    return gameClass.getWinnerAtTheEnd();
  }
}

export default Round;
