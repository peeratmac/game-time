import chai from 'chai';
const expect = chai.expect;

import Player from '../src/Player.js';

describe('Player', () => {
  let player1, player2;

  beforeEach(() => {
    player1 = new Player(1, 'Annabella');
    player2 = new Player(2, 'Karissa');
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

  it('should be able to reset round money back to zero', () => {
    player1.currentRoundMoney = 500;
    player1.resetRoundMoney();
    expect(player1.currentRoundMoney).to.equal(0);
  });

  it('should be able to get updated round money and return the round money', () => {
    player2.currentRoundMoney = 2000;
    expect(player2.getUpdatedRoundMoneyWithScore()).to.equal(2000);
  });

  it.only('should be able to update player total money', () => {
    player1.totalMoney = 500;
    player1.updateTotalMoney(2000);
    expect(player1.totalMoney).to.equal(2500);
  });
});
