/* eslint-disable */
import { expect } from 'chai';
import sinon from 'sinon';
import mapPublicDispatchToProps from './mapPublicDispatchToProps';
import actions from '../../actions/actions';
import _ from 'lodash';

describe('mapPublicDispatchToProps', () => {
  const fakeDispatch = () => 'dispatch';

  let mergeSpy;
  beforeEach(() => {
    mergeSpy = sinon.spy(_, 'merge');
  });

  afterEach(() => {
    mergeSpy.restore();
  });

  it('uses only public actions', () => {
    mapPublicDispatchToProps(fakeDispatch);

    expect(mergeSpy.withArgs(...actions.publicActions)).to.be.calledOnce;
  });
});
