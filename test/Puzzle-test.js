import chai from 'chai';
const expect = chai.expect;
import data from '../src/data/sample-data.js' 
import Puzzle from '../src/Puzzle.js';

describe('Puzzle', () => {
  let puzzle;

  beforeEach(() => {
    puzzle = new Puzzle(data.puzzles);
  });
  it('should store all the puzzles from the puzzle bank', function () {
    expect(puzzle.puzzleBank).to.equal(data);
  });

  it('should be able to randomly pick a bank of puzzles', () => {
    puzzle.choosePuzzleBank();
    expect(puzzle.chosenBank.length).to.equal(24);
  })

  it('should be able to return a random puzzle from the chosen bank', () => {
    puzzle.choosePuzzleBank();
    expect([puzzle.choosePuzzle()].length).to.equal(1);
  })
});
