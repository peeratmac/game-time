class Wheel {
  constructor(data) {
    this.wheelVals = data.wheel;
  }

  randomizeWheelVal() {
    let spinIndex = Math.floor(Math.random() * 22);
    return this.wheelVals[spinIndex];
  }

}

export default Wheel;
