/* eslint-disable */
import { expect } from 'chai';
import mapPublicStateToProps from './mapPublicStateToProps';

describe('mapPublicStateToProps', () => {
  const wholeState = {
    publicState: {
      pub: 1
    },
    restrictedState: {
      rest: 1
    }
  };

  it('returns only public part of the state', () => {
    expect(mapPublicStateToProps(wholeState)).to.be.eql(wholeState.publicState);
  });

  it('does not return the restricted part of the state', () => {
    expect(mapPublicStateToProps(wholeState)).to.not.be.eql(wholeState.restrictedState);
  });
});
