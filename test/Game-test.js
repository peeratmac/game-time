import chai from 'chai';
const expect = chai.expect;

import Game from '../src/Game.js';
import data from '../src/data/sample-data.js'
describe('Game', () => {
  let game;
  beforeEach(() => {
    game = new Game(data);
    game.startGame();
    game.instantiatePlayers('Chris', 'Peerat', 'Victor');
  });

  it('should take in player names and associated starting values', () => {
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

  it('should start at round 0 prior to starting the game', () => {
    expect(game.currentRound).to.equal(1);
  });

  it('should start a bonus round at the end of round 4', () => {
    game.startBonus();
    expect(game.bonusRound).to.equal(true);
  });

  describe('Determining Winner Test Section', () => {
    let gameWinner;
    beforeEach(() => {
      gameWinner = new Game(data);
      gameWinner.startGame();
      gameWinner.instantiatePlayers('Chris', 'Peerat', 'Victor');
      gameWinner.players[0].currentRoundMoney = 100;
      gameWinner.players[2].totalMoney = 3000;
    });
    
    it('should be able to determine a winner for each round', () => {
      gameWinner.getWinnerThisRound(gameWinner.players[0]);
      expect(gameWinner.players).to.deep.equal([{
        id: 1,
        name: 'Chris',
        currentRoundMoney: 0,
        totalMoney: 100
      }, { id: 2, name: 'Peerat', currentRoundMoney: 0, totalMoney: 0 },
      {
        id: 3,
        name: 'Victor',
        currentRoundMoney: 0,
        totalMoney: 3000
      }]);
    });

    it('should be able to determine a winner at the end of round 4', () => {
      expect(gameWinner.getWinnerAtTheEnd()).to.equal('Victor');
    });
  });
});
