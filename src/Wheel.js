class Wheel {
  constructor(data) {
    this.wheelVals = data.wheel;
    this.currentVal = 0;
  }

  randomizeWheelVal() {
    let spinIndex = Math.floor(Math.random() * 22);
    this.currentVal = this.wheelVals[spinIndex]
  }

}

export default Wheel;
