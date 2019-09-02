import chai from 'chai';
const expect = chai.expect;

import data from '../src/data/sample-data.js';
import Game from '../src/Game.js';
import Puzzle from '../src/Puzzle.js';
import Round from '../src/Round.js';

describe('Round', () => {
  let game, puzzle, round;

  beforeEach(() => {
    game = new Game([
      { id: 1, name: 'Chris' },
      { id: 2, name: 'Peerat' },
      { id: 3, name: 'Victor' }
    ]);
    puzzle = new Puzzle(data.puzzles);
    puzzle.choosePuzzleBank();
    puzzle = puzzle.choosePuzzle();
    round = new Round(puzzle);
  });

  it('should store the current rounds puzzle', () => {
    expect(round.puzzle).to.be.an('object');
  });

  it("should store the current player's turn", () => {
    expect(round.playerTurn).to.be(0);
  });

  it('should store the current round standings', () => {
    expect(round.roundStandings).to.be.an('array');
  });

  it('should start with no letters guessed', () => {
    expect(round.guessedLetters).to.be.an('array');
  });

  it('should store letters guessed after they are made', () => {
    round.storeGuess('a');
    expect(round.guessedLetters).to.deep.equal(['a']);
  });

  it('should start a round with a new puzzle', () => {
    round.startRound();
    expect(round.puzzle).to.not.deep.equal(puzzle);
  });

  it('should check if a guess is within the correct answer', () => {
    round.checkGuess('a');
    expect(round.puzzle).to.not.deep.equal(2);
  });

  it.only('should check whether the guess solved the question/puzzle', () => {
    // ! need a test
  });
});
