class Players {
  constructor(id, name, currentRoundMoney, totalMoney) {
    this.id = id;
    this.name = name;
    this.currentRoundMoney = currentRoundMoney || 0;
    this.totalMoney = totalMoney || 0;
  }
}

export default Players;
