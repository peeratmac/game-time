import chai from 'chai';
const expect = chai.expect;
import data from '../src/data/sample-data.js';
import Puzzle from '../src/Puzzle.js';

describe('Puzzle', () => {
  let puzzle;

  beforeEach(() => {
    puzzle = new Puzzle(data.puzzles);
  });

  it('should store all the puzzles from the puzzle bank', () => {
    expect(puzzle.fullBank).to.equal(data.puzzles);
  });

  it('should be able to randomly pick a bank of puzzles', () => {
    puzzle.choosePuzzleBank();
    expect(puzzle.chosenBank.length).to.equal(24);
  });

  it.only('should be able to return a random puzzle from the chosen bank', () => {
    puzzle.choosePuzzleBank();
    puzzle.setPuzzle();
    expect(puzzle.newPuzzle).to.be.an('object');
  });

  it.only('should return the puzzle answer as an array', () => {
    puzzle.choosePuzzleBank();
    puzzle.setPuzzle();
    // console.log(puzzle.createPuzzleArray());
    expect(puzzle.newPuzzle).to.be.an('object');
  }); 

});
