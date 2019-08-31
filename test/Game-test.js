import chai from 'chai';
const expect = chai.expect;

import Game from '../src/Game.js';

describe('Game', function () {
  let game
  beforeEach(() => {
    game = new Game([{ id: 1, name: 'Chris' }, {id: 2, name: 'Peerat'}, { id: 3, name: 'Victor' }]);
  });

  it('should take in player names', () => {
    expect(game.players).to.deep.equal([{
      id: 1,
      name: 'Chris'
    }, {
      id: 2,
      name: 'Peerat'
    }, {
      id: 3,
      name: 'Victor'
    }]);
  });

  it('should default game standings to zeroes', () => {
    game.startGame();
    expect(game.gameStandings).to.deep.equal([{ id: 1, money: 0 }, { id: 2, money: 0 }, { id: 3, money: 0 }]);
  })

  it('should start at round 1', () => {
    game.startGame();
    expect(game.currentRound).to.equal(1);
  })

  it('should start a bonus round after round 4', () => {
    game.startGame();
    game.startBonus();
    expect(game.bonusRound).to.equal(true);
  })

  it('should be able to determine a winner', () => {
    game.startGame();
    game.gameStandings.map(player => player.id === 1 ? player.money = 300 : null);
    expect(game.getWinner()).to.deep.equal({id: 1, name: 'Chris'})
  })
});
