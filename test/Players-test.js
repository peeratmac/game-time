import chai from 'chai';
const expect = chai.expect;

import Player from '../src/Player.js';

describe('Player', () => {
  let player;

  beforeEach(() => {
    player = new Player(2, 'Annabella');
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
    let player = new Player(3, 'Kombuchaju', 650, 1350);
    expect(player.currentRoundMoney).to.equal(650);
    expect(player.totalMoney).to.equal(1350);
  });
});
