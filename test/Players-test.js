import chai from 'chai';
const expect = chai.expect;

import Players from '../src/Players.js';

describe('Player', () => {
  let player;

  beforeEach(() => {
    player = new Players(2, 'Annabella');
  });

  it('should be able to hold player information based on the instantiation of Player', () => {
    expect(player).to.eql({
      id: 2,
      name: 'Annabella',
      currentRoundMoney: 0,
      totalMoney: 0
    });
  });

  it('should keep track of currentRoundMoney and totalMoney as the game progresses', () => {
    let player = new Players(3, 'Kombuchaju', 650, 1350);
    expect(player.currentRoundMoney).to.equal(650);
    expect(player.totalMoney).to.equal(1350);
  });
});
