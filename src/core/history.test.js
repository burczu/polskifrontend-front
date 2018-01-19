/* eslint-disable */
import { expect } from 'chai';

describe('history', () => {
  beforeEach(() => {
    process.env.BROWSER = 'BROWSER';
  });

  afterEach(() => {
    process.env.BROWSER = undefined;
  });

  it('it returns the history object', () => {
    const history = require('./history').default;

    expect(history).to.be.not.undefined;
  });
});
