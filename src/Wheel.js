import data from './data/sample-data';

class Wheel {
  constructor() {
    this.wheelVals = [];
    this.currentVal = 0;
  }

  randomizeWheelVal() {
    this.wheelVals = data.wheel;
    let spinIndex = Math.floor(Math.random() * 22);
    this.currentVal = this.wheelVals[spinIndex];
    return this.currentVal;
  }
}

export default Wheel;