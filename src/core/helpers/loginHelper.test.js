/* eslint-disable */
import { expect } from 'chai';
import sinon from 'sinon';
import * as loginHelper from './loginHelper';
import cookies from './cookieHelper';

describe('loginHelper', () => {
  const token = 'token';
  const key = 'PL_FRONT_END';

  let setSpy;
  let getStub;
  let removeSpy;
  beforeEach(() => {
    setSpy = sinon.spy(cookies, 'set');
    getStub = sinon.stub(cookies, 'get');
    getStub.returns(token);
    removeSpy = sinon.spy(cookies, 'remove');
  });

  afterEach(() => {
    setSpy.restore();
    getStub.restore();
    removeSpy.restore();
  });

  it('saves token on appropriate key', () => {
    loginHelper.saveLoginToken(token);

    expect(setSpy.withArgs(token, key)).to.be.calledOnce;
  });

  it('gets token by appropriate key', () => {
    expect(loginHelper.getLoginToken()).to.be.eql(token);
  });

  it('removes token saved on the key', () => {
    loginHelper.clearLoginToken();

    expect(removeSpy.withArgs(key)).to.be.calledOnce;
  });
});
