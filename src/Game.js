import Player from './Player.js';
import Puzzle from './Puzzle.js';
import data from './data/sample-data.js';

class Game {
  constructor(players, data) {
    this.data = data;
    this.players = players;
    this.currentRound = 1;
    this.puzzles = [];
    this.bonusRound = false;
  }
  
  startGame() {
    this.players = [];
    this.getPuzzles();
  }
  
  getPuzzles() {
    let puzzleClass = new Puzzle(data.puzzles);
    while (this.puzzles.length < 6) {
      puzzleClass.choosePuzzleBank();
      let puzzle = puzzleClass.setPuzzle();
      this.puzzles.push(puzzle);
    }
  }

  incrementRound() {
    if (this.currentRound < 5) {
      return this.currentRound++;
    } else {
      this.currentRound = 0;
    }
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

  getWinnerThisRound(winner) {
    this.players.map(player => {
      if (player.id === winner.id) {
        player.totalMoney += winner.currentRoundMoney;
        player.currentRoundMoney = 0;
      } else {
        player.currentRoundMoney = 0;
      }
    });
  }

  getWinnerAtTheEnd() {
    let sortedPlayers = this.players.sort((a, b) => {
      return b.totalMoney - a.totalMoney;
    });
    return sortedPlayers[0].name;
  }

  endRound() {
    this.players.forEach(player => {
      player.resetRoundMoney();
    });
  }
}

export default Game;
