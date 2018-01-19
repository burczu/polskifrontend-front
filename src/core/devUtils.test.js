/* eslint-disable */
import { expect } from 'chai';

describe('devUtils', () => {
  it('exports ErrorReporter properly', () => {
    const devUtils = require('./devUtils');
    const expectedValue = require('redbox-react').default;

    expect(devUtils.ErrorReporter).to.be.eql(expectedValue);
  });

  it('exports deepForceUpdate properly', () => {
    const devUtils = require('./devUtils');
    const expectedValue = require('react-deep-force-update');

    expect(devUtils.deepForceUpdate).to.be.eql(expectedValue);
  });
});
