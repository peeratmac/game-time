class Game {
  constructor(players, standings, round, bonusRound) {
    this.players = players;
    this.gameStandings = standings;
    this.currentRound = round;
    this.bonusRound = bonusRound;
  }

  startGame() {
    this.gameStandings = [{ id: 1, money: 0 }, { id: 2, money: 0 }, { id: 3, money: 0 }];
    this.currentRound = 1;
  }

  startBonus() {
    this.bonusRound = true;
  }

  getWinner() {
    let sortedPlayers = this.gameStandings.sort((playerA, playerB) => {
      playerA - playerB
    })
    let winnerID = sortedPlayers.shift();
    return this.players.find(elem => elem.id === winnerID.id)
  }

  endGame() {
    return true;
  }
}

export default Game;
