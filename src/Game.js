import Player from './Player.js';
import Round from './Round.js';
import Puzzle from './Puzzle.js';
import data from './data/sample-data.js';

class Game {
  constructor(data) {
    this.data = data;
    this.players = [];
    this.currentRound = 0;
    this.puzzles = [];
    this.bonusRound = false;
  }

  startGame() {
    this.players = []
    this.instantiatePlayers();
    this.getPuzzles();
    let round = new Round(this.puzzles[this.currentRound], this.players);
    round.startRound();
  }

  getPuzzles() {
    let puzzleClass = new Puzzle(data.puzzles);
    while (this.puzzles.length < 5) {
      puzzleClass.choosePuzzleBank();
      let puzzle = puzzleClass.setPuzzle();
      this.puzzles.push(puzzle)
    }
  }

  beginNewRound() {
    this.currentRound === 4 ? this.beginBonusRound : this.incrementRound();
    let round = new Round(this.puzzles[this.currentRound], this.players);
    round.startRound();
  }

  incrementRound() {
    return this.currentRound++;
  }

  instantiatePlayers(p1, p2, p3) {
    let pOne = new Player(1, p1);
    let pTwo = new Player(2, p2);
    let pThree = new Player(3, p3);
    this.players.push(pOne, pTwo, pThree);
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

  getWinnerThisRound(winner) {
    this.players.map((player) => {
      if (player.id === winner.id) {
        player.totalMoney += winner.currentRoundMoney;
        player.currentRoundMoney = 0;
      } else {
        player.currentRoundMoney = 0;
      }
    })
  }

  getWinnerAtTheEnd() {
    let sortedPlayers = this.players.sort((a, b) => {
      return b.totalMoney - a.totalMoney;
    });
    return sortedPlayers[0];
  }

  endGame() {
    // ? how do we end it?
    return true;
  }
}

export default Game;
