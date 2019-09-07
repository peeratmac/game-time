class Player {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.currentRoundMoney = 0;
    this.totalMoney = 0;
  }

  updateCurrentRoundMoney(score) {
    return (this.currentRoundMoney += score);
  }

  resetRoundMoney() {
    this.currentRoundMoney = 0;
  }

  updateTotalMoney(score) {
    return (this.totalMoney += score);
  }

  endTurn() {
    round.updateRoundStandings(this);
  }

  getUpdatedRoundMoneyWithScore() {
    this.updateCurrentRoundMoney;
    return this.currentRoundMoney;
  }
}

export default Player;
