import chai from 'chai'
const expect = chai.expect;

import data from '../src/data/sample-data.js'
import Puzzle from '../src/Puzzle.js';
import Round from '../src/Round.js';

describe('Round', () => {
  let puzzle, round;

  beforeEach(() => {
    puzzle = new Puzzle(data.puzzles);
    puzzle.choosePuzzleBank();
    puzzle = puzzle.choosePuzzle();
    round = new Round(puzzle);
  });
  it.only('should store the current rounds puzzle', () => {
    expect(round.puzzle).to.be.an('object');
  });
});
