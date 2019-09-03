import chai from 'chai';
const expect = chai.expect;

import Wheel from '../src/Wheel';
import Turn from '../src/Turn.js';
import data from '../src/data/sample-data.js'; 

describe('Turn', function () {
  let turn
  let wheel
  
  beforeEach(() => {
    turn = new Turn()
    wheel = new Wheel(data); 
  });

  it.only('should be a function', () => {
    expect(turn).to.be.an('object');
  });

  it.only('should be able receive and random wheel value from the Wheel class', () => {
    expect(turn.spinWheel()).to.be.equal(1);
  })

});