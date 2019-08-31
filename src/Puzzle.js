class Puzzle {
  constructor(puzzles) {
    this.fullBank = puzzles;
    this.chosenBank = [];
  }

  choosePuzzleBank() {
    let options = ['one_word_answers', 'two_word_answers', 'three_word_answers', 'four_word_answers'];
    let index = Math.floor(Math.random() * 4);
    let chosenOption = options[index];
    this.chosenBank = this.fullBank[chosenOption].puzzle_bank;
  }

  choosePuzzle() {
    let index = Math.floor(Math.random() * 24);
    return this.chosenBank[index];
  }
}

export default Puzzle;
