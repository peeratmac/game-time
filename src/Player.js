class Player {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.currentRoundMoney = 0;
    this.totalMoney = 0;
  }

  updateCurrentRoundMoney(id, score) {
    if (this.id === id) {
      this.currentRoundMoney += score;
    }
  }

  updateTotalMoney(id, score) {
    if (this.id === id) {
      this.totalMoney += score;
    }
  }
}

export default Player;
