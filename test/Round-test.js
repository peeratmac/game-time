import chai from 'chai';
const expect = chai.expect;

import data from '../src/data/sample-data.js';
import Game from '../src/Game.js';
import Puzzle from '../src/Puzzle.js';
import Player from '../src/Player.js'
import Round from '../src/Round.js';

describe('Round', () => {
  let game, puzzle, round;

  beforeEach(() => {
    game = new Game(data);
    game.instantiatePlayers('Chris', 'Peerat', 'Victor');
    // game.startGame();
    puzzle = new Puzzle(data.puzzles);
    puzzle.choosePuzzleBank();
    puzzle = puzzle.setPuzzle();
    round = new Round(puzzle, game.players);
    round.startRound();
  });

  it('should store the current rounds puzzle', () => {
    expect(round.puzzle).to.be.an('object');
  });

  it("should store the current player's turn", () => {
    expect(round.playerTurnIndex).to.equal(0);
  });

  it('should store the current round standings', () => {
    round.updateRoundStandings({
      id: 1,
      name: 'Chris',
      currentRoundMoney: 600,
      totalMoney: 0
    })
    expect(round.roundStandings).to.deep.equal([
      { id: 1, name: 'Chris', currentRoundMoney: 600, totalMoney: 0 },
      { id: 2, name: 'Peerat', currentRoundMoney: 0, totalMoney: 0 },
      { id: 3, name: 'Victor', currentRoundMoney: 0, totalMoney: 0 }
    ]);
  });

  it('should start with no letters guessed', () => {
    expect(round.guessedLetters).to.be.an('array');
  });

  it('should store letters guessed after they are made', () => {
    round.storeGuess('a');
    expect(round.guessedLetters).to.deep.equal(['a']);
  });

  it('should check if a guess is within the correct answer', () => {
    round.checkGuess('a');
    expect(round.puzzle).to.not.deep.equal(2);
  });

  it('should calculate a user score for correct guesses', () => {
    round.checkGuess('a');
    round.checkGuess('e');
    expect(round.calculateScore(2, 600)).to.not.equal(0);
  });

  it('should check whether the guess solved the question/puzzle', () => {
    expect(round.checkSolveByLetter()).to.equal(false);
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
    expect(round.checkSolve(round.puzzle['correct_answer'])).to.equal(true);
    expect(round.correctIndicesArr.length).to.not.equal(0);
  });

  it('should find the winner of the round', () => {
    console.log(round.roundStandings)
    round.roundStandings[2].currentRoundMoney = 800;
    round.roundStandings[1].currentRoundMoney = 700;
    round.roundStandings[0].currentRoundMoney = 750;
    round.updateGameStandings(game);
    console.log(round.roundStandings)
    expect(round.roundStandings[0]).to.deep.equal({
      id: 3,
      name: 'Victor',
      currentRoundMoney: 800,
      totalMoney: 0
    });
  });

  it('should be able to end round and return guessLetters and correctIndicesArr to empty array state', () => {
    round.endRound(game);
    expect(round.guessedLetters.length).to.equal(0);
    expect(round.correctIndicesArr.length).to.equal(0);
  });
});

export default Player;