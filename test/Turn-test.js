import chai from 'chai';
const expect = chai.expect;
import Wheel from '../src/Wheel.js';
import Turn from '../src/Turn.js';
import data from '../src/data/sample-data.js';

describe('Turn', function() {
  let turn;
  let wheel;

  beforeEach(() => {
    turn = new Turn(data);
    wheel = new Wheel(data);
  });

  it('should be a function', () => {
    expect(turn).to.be.an('object');
  });

  it('should be able receive and random wheel value from the Wheel class', () => {
    let spin1 = wheel.randomizeWheelVal();
    let spin2 = wheel.randomizeWheelVal();
    expect(spin1).to.not.equal(spin2);
  });
});