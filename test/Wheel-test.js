import chai from 'chai';
const expect = chai.expect;
import data from '../src/data/sample-data.js'; 
import Wheel from '../src/Wheel.js';

describe('Wheel', function () {
  let wheel 
  beforeEach(() => {
    wheel = new Wheel(data)
  });

  it('should be a function', () => {
    expect(wheel).to.be.an('object');
  });

  it('should be able to hold the Wheel of Fortune values', () => {
    expect(wheel.wheelVals).to.be.an('array');
  });
  

  it('should be able to hold the Wheel of Fortune values', () => {
    wheel.randomizeWheelVal();

    expect(wheel.currentVal).to.not.equal(undefined);
  });
  
  
});
