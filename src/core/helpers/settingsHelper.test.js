/* eslint-disable */
import { expect } from 'chai';
import sinon from 'sinon';
import settingsHelper from './settingsHelper';
import cookies from './cookieHelper';

describe('settingsHelper', () => {
  const realKey = 'PL_FRONT_END_USER_SETTINGS';
  const fakeKey = 'test';
  const initialSettings = {
    tiles: true,
    clickedLinks: [],
    lastNewsVisit: new Date(1900, 1, 1)
  };
  const cookieSettings = { path: '/', expires: new Date(2050, 1, 1) };

  let setSpy;
  let removeSpy;
  beforeEach(() => {
    setSpy = sinon.spy(cookies, 'set');
    removeSpy = sinon.spy(cookies, 'remove');
  });

  afterEach(() => {
    setSpy.restore();
    removeSpy.restore();
  });

  it('can save settings as cookie at appropriate key', () => {
    settingsHelper.saveSettings({});

    expect(setSpy.withArgs({}, realKey, cookieSettings)).to.be.calledOnce;
  });

  it('can remove cookie with settings', () => {
    settingsHelper.clearSettings();

    expect(removeSpy.withArgs(realKey)).to.be.calledOnce;
  });

  describe('if cookie exists', () => {
    let getStub;
    beforeEach(() => {
      getStub = sinon.stub(cookies, 'get');
      getStub.callsFake((key) => {
        if (key === realKey) {
          return {
            test: true
          };
        }
      });
    });

    afterEach(() => {
      getStub.restore();
    });

    it('gets settings saved in the cookie', () => {
      expect(settingsHelper.getSettings(realKey)).to.be.eql({ test: true });
    });
  });

  describe('if cookie does not exists', () => {
    let getStub;
    beforeEach(() => {
      getStub = sinon.stub(cookies, 'get');
      getStub.returns(undefined);
    });

    afterEach(() => {
      getStub.restore();
    });

    it('gets the initial settings', () => {
      expect(settingsHelper.getSettings(fakeKey)).to.be.eql(initialSettings);
    });
  });
});
