import chai from 'chai';
const expect = chai.expect;
import Wheel from '../src/Wheel.js';
import Turn from '../src/Turn.js';
import data from '../src/data/sample-data.js';
import Round from '../src/Round.js';
import Puzzle from '../src/Puzzle.js';

describe('Turn', () => {
  let turn, wheel, puzzle, round;

  beforeEach(() => {
    puzzle = new Puzzle(data.puzzles);
    turn = new Turn(data);
    wheel = new Wheel(data);
    round = new Round(puzzle);
  });

  it('should be a function', () => {
    expect(turn).to.be.an('object');
  });

  it('should be able receive and random wheel value from the Wheel class', () => {
    let spin1 = turn.spinWheel(wheel);
    let spin2 = turn.spinWheel(wheel);
    expect(spin1).to.not.equal(spin2);
  });
});
