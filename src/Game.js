class Game {
  constructor(players) {
    this.players = players;
    this.currentRound = 0;
    // this.gameStandings = [{id: 1, money: 0}, {id: 2, money: 0}, {id: 3, money: 0}];
    // this.bonusRound = bonusRound;
  }

  // startGame() {

  //   this.gameStandings;
  //   this.gameStandings = [{ id: 1, money: 0 }, { id: 2, money: 0 }, { id: 3, money: 0 }];
  //   this.currentRound;
  // }

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
