import chai from 'chai';
const expect = chai.expect;
import Round from '../src/Round.js';

describe('Round', () => {
  let round;

  beforeEach(() => {
    round = new Round();
  });
  it('should return true', function() {
    expect(true).to.equal(true);
  });
});
