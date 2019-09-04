import Players from './Players.js';

class Game {
  constructor(data, p1, p2, p3) {
    this.data = data;
    this.players = [];
    this.pOne = new Player(p1);
    this.pTwo = new Player(p2);
    this.pThree = new Player(p3);
    this.currentRound = 0;
    this.round = {};
    this.currentPuzzle;
    this.bonusRound = false;
    // this.gameStandings = [{id: 1, money: 0}, {id: 2, money: 0}, {id: 3, money: 0}];
  }

  startGame() {
    this.instantiatePlayers();
    // this.gameStandings;
    // this.gameStandings = [{ id: 1, money: 0 }, { id: 2, money: 0 }, { id: 3, money: 0 }];
    // this.currentRound;
  }

  instantiatePlayers() {
    this.players.push(this.pOne, this.pTwo, this.pThree);
    return this.players;
  }

  beginNewRound() {
    this.currentRound === 4 ? this.beginBonusRound : 
      this.currentRound ++;
    puzzle.choosePuzzleBank();
    this.currentPuzzle = puzzle.setPuzzle();
  }

  startBonus() {
    this.bonusRound = true;
  }

  // getWinner() {
  //   let sortedPlayers = this.gameStandings.sort((playerA, playerB) => {
  //     playerA - playerB
  //   })
  //   let winnerID = sortedPlayers.shift();
  //   return this.players.find(elem => elem.id === winnerID.id)
  // }

  getWinnerThisRound() {
    let sortedPlayers = this.players.sort((a, b) => {
      return b.currentRoundMoney - a.currentRoundMoney;
    });
    return sortedPlayers[0];
  }

  getWinnerAtTheEnd() {
    let sortedPlayers = this.players.sort((a, b) => {
      return b.totalMoney - a.totalMoney;
    });
    return sortedPlayers[0];
  }
}

  endGame() {
    // ? how do we end it?
    return true;
  }

}

export default Game;
