import Round from './Round';

// import Wheel from './Wheel';

class Turn {
  constructor(data) {}

  spinWheel(wheel) {
    wheel.randomizeWheelVal();
    return wheel.currentVal;
  }

  // makeGuess(letter) {
  //   round.puzzle.join('');
  // }

  // solvePuzzle() {}

  // buyVowel() {}

  startTurn() {}

  endTurn() {}
}

export default Turn;
