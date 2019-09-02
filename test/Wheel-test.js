import chai from 'chai';
const expect = chai.expect;
import data from '../src/data/sample-data.js'; 
import Wheel from '../src/Wheel.js';

describe('See if the tests are running', function () {
  let wheel 
  beforeEach(() => {
    wheel = new Wheel(data.wheel)
  });

  it.only('should be a function', () => {
    expect(constructor).to.be.an('object');
  });

  it('')
  
  
});
