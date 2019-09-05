import chai from 'chai';
const expect = chai.expect;

import Player from '../src/Player.js';

describe('Player', () => {
  let player1, player2;

  beforeEach(() => {
    player1 = new Player(1, 'Annabella');
    player2 = new Player(2, 'Karissa')
  });

  it('should be able to hold player information based on the instantiation of Player', () => {
    expect(player1).to.eql({
      id: 1,
      name: 'Annabella',
      currentRoundMoney: 0,
      totalMoney: 0
    });
  });

  it('should keep track of currentRoundMoney and totalMoney as the game progresses', () => {
    player2.updateCurrentRoundMoney(650);
    player2.updateTotalMoney(1350);
    expect(player1.currentRoundMoney).to.equal(0);
    expect(player2.currentRoundMoney).to.equal(650);
    expect(player2.totalMoney).to.equal(1350);
    player2.resetRoundMoney();
    expect(player2.currentRoundMoney).to.equal(0);
  });
});
