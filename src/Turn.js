import Round from './Round';

// import Wheel from './Wheel';

class Turn {
  constructor(data) {}

  spinWheel(wheel) {
    wheel.randomizeWheelVal();
    return wheel.currentVal;
  }

  //? do we need these at all?
  startTurn() {}

  endTurn() {}
}

export default Turn;
