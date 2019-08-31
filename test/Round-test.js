import chai from 'chai'
const expect = chai.expect;

import data from '../src/data/sample-data.js'
import Game from '../src/Game.js'
import Puzzle from '../src/Puzzle.js';
import Round from '../src/Round.js';

describe('Round', () => {
  let game, puzzle, round;

  beforeEach(() => {
    game = new Game([{ id: 1, name: 'Chris' }, {id: 2, name: 'Peerat'}, { id: 3, name: 'Victor' }]);    
    puzzle = new Puzzle(data.puzzles);
    puzzle.choosePuzzleBank();
    puzzle = puzzle.choosePuzzle();
    round = new Round(puzzle, game);
  });
  it('should store the current rounds puzzle', () => {
    expect(round.puzzle).to.be.an('object');
  })

  it.only('should store the current player\'s turn', () => {
    expect(round.playerTurn).to.be.an('object');
  })

  it('should store the current round standings', () => {
    expect(round.roundStandings).to.be.an('array');
  })
  
});
