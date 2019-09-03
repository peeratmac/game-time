import { throws } from "assert";

class Puzzle {
  constructor(puzzles) {
    this.fullBank = puzzles;
    this.chosenBank = [];
    this.newPuzzle = {};
  }

  choosePuzzleBank() {
    let options = ['one_word_answers', 'two_word_answers', 'three_word_answers', 'four_word_answers'];
    let index = Math.floor(Math.random() * 4);
    // console.log(this.fullBank)
    let chosenOption = options[index];
    this.chosenBank = this.fullBank[chosenOption].puzzle_bank;
  }

  setPuzzle() {
    let index = Math.floor(Math.random() * 24);
    this.newPuzzle = this.chosenBank[index];
  }

  // createPuzzleArray() {
  //   return this.newPuzzle
  // }

}

export default Puzzle;
