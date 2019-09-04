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
    puzzle = puzzle.setPuzzle();
    round = new Round(puzzle);
    round.startRound();
    round.roundStandings = [{ id: 1, money: 50 }, { id: 2, money: 25 }, { id: 3, money: 150 }];
  });

  it('should store the current rounds puzzle', () => {
    expect(round.puzzle).to.be.an('object');
  });

  it('should store the current player\'s turn', () => {
    expect(round.playerTurnIndex).to.equal(0);
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

  it('should check whether the guess solved the question/puzzle', () => {
    expect(round.checkSolve(round.puzzle['correct_answer'])).to.equal(true);
    expect(round.guessedLetters.length).to.equal(0);
    expect(round.checkSolve('NOT A REAL ANSWER')).to.equal(false);
  });

  it('should check whether the letter guess solved the question/puzzle', () => {
    round.checkGuess('a');
    round.checkGuess('b');
    round.checkGuess('c');
    round.checkGuess('d');
    round.checkGuess('e');
    round.checkGuess('f');
    round.checkGuess('g');
    round.checkGuess('h');
    round.checkGuess('i');
    round.checkGuess('j');
    round.checkGuess('k');
    round.checkGuess('l');
    round.checkGuess('m');
    round.checkGuess('n');
    round.checkGuess('o');
    round.checkGuess('p');
    round.checkGuess('q');
    round.checkGuess('r');
    round.checkGuess('s');
    round.checkGuess('t');
    round.checkGuess('u');
    round.checkGuess('v');
    round.checkGuess('w');
    round.checkGuess('x');
    round.checkGuess('y');
    round.checkGuess('z');
    expect(round.guessedLetters.length).to.equal(0);
  });

  it('should find the winner of the round, and return their score', () => {
    round.endRound(game);
    expect(round.roundStandings).to.deep.equal([{ id: 3, money: 150 }, { id: 1, money: 50 }, { id: 2, money: 25 }]);
  });

    it('should find update the round winner\'s score to the game standings', () => {
    round.endRound(game);
    expect(game.gameStandings).to.deep.equal([{ id: 1, money: 0 }, { id: 2, money: 0 }, { id: 3, money: 150 }]);
  });
});
