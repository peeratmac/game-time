import chai from 'chai';
const expect = chai.expect;
import data from '../src/data/sample-data.js' 
import Puzzle from '../src/Puzzle.js';

describe('Puzzle', () => {
  let puzzle;

  beforeEach(() => {
    puzzle = new Puzzle(data);
  });
  it('should store all the puzzles from the puzzle bank', function() {
    expect(puzzle.puzzleBank).to.equal(data);
  });
});
