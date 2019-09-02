import chai from 'chai';
const expect = chai.expect;

import Turn from '../src/Turn.js';

describe('Turn', function () {
  let turn
  
  beforeEach(() => {
    turn = new Turn()
  });

  it.only('should be a function', () => {
    expect(turn).to.be.a('function');
  });

});