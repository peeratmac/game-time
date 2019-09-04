import chai from 'chai';
const expect = chai.expect;

import Game from '../src/Game.js';
import Players from '../src/Players.js';
import Round from '../src/Round.js';

describe('Game', () => {
  let game;
  beforeEach(() => {
    // game = new Game([
    //   { id: 1, name: 'Chris' },
    //   { id: 2, name: 'Peerat' },
    //   { id: 3, name: 'Victor' }
    // ]);
    game = new Game();
    game.instantiatePlayers('Chris', 'Peerat', 'Victor');
  });

  it('should take in player names and associated starting values', () => {
    // console.log(game.players);
    expect(game.players).to.deep.equal([
      {
        id: 1,
        name: 'Chris',
        currentRoundMoney: 0,
        totalMoney: 0
      },
      {
        id: 2,
        name: 'Peerat',
        currentRoundMoney: 0,
        totalMoney: 0
      },
      {
        id: 3,
        name: 'Victor',
        currentRoundMoney: 0,
        totalMoney: 0
      }
    ]);
  });

  // it('should default game standings to zeroes', () => {
  //   game.startGame();
  //   expect(game.gameStandings).to.deep.equal([
  //     { id: 1, money: 0 },
  //     { id: 2, money: 0 },
  //     { id: 3, money: 0 }
  //   ]);
  // });

  it('should start at round 0 prior to starting the game', () => {
    expect(game.currentRound).to.equal(0);
  });

  it('should start a bonus round at the end of round 4', () => {
    game.startBonus();
    expect(game.bonusRound).to.equal(true);
  });

  describe('Determining Winner Test Section', () => {
    let gameWinner;
    beforeEach(() => {
      gameWinner = new Game();
      gameWinner.instantiatePlayers('Chris', 'Peerat', 'Victor');
      gameWinner.players[0].currentRoundMoney = 100;
      gameWinner.players[2].totalMoney = 3000;
    });

    it('should be able to determine a winner for each round', () => {
      // console.log(gameWinner.getWinnerThisRound());
      expect(gameWinner.getWinnerThisRound()).to.deep.equal({
        id: 1,
        name: 'Chris',
        currentRoundMoney: 100,
        totalMoney: 0
      });
    });

    it('should be able to determine a winner at the end of round 4', () => {
      expect(gameWinner.getWinnerAtTheEnd()).to.deep.equal({
        id: 3,
        name: 'Victor',
        currentRoundMoney: 0,
        totalMoney: 3000
      });
    });
  });
});
