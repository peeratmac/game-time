class Player {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.currentRoundMoney = 0;
    this.totalMoney = 0;
  }

  updateCurrentRoundMoney(score) {
    this.currentRoundMoney += score;
  }

  resetRoundMoney() {
    this.currentRoundMoney = 0;
  }

  updateTotalMoney(score) {
    this.totalMoney += score;
  }
}

export default Player;
