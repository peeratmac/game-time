import Game from '../test/Round-test.js';
// import Puzzle from './Puzzle.js'
// import data from './data/sample-data.js';

class Round {
  constructor(puzzle, game) {
    this.puzzle = puzzle;
    this.playerTurn = game.players[0];
    this.roundStandings = [];
  }
}

export default Round;
