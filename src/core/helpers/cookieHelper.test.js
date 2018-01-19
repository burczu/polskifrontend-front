/* eslint-disable */
import { expect } from 'chai';
import sinon from 'sinon';
import cookieHelper, { __RewireAPI__ as rewire } from './cookieHelper';

describe('cookieHelper', () => {
  const instance = {
    set: () => {},
    get: (value) => {
      const item = {
        value: 'test-cookie'
      };

      return item[value];
    },
    remove: () => {}
  };

  let setSpy;
  let getSpy;
  let removeSpy;
  beforeEach(() => {
    setSpy = sinon.spy(instance, 'set');
    getSpy = sinon.spy(instance, 'get');
    removeSpy = sinon.spy(instance, 'remove');
  });

  afterEach(() => {
    setSpy.restore();
    getSpy.restore();
    removeSpy.restore();
  });

  describe('if cookie did not set up', () => {
    it('it doesn\'t set the cookie', () => {
      cookieHelper.set('value', 'name');

      expect(setSpy).to.be.not.called;
    });

    it('it doesn\'t get the cookie', () => {
      cookieHelper.get('name');

      expect(getSpy).to.not.be.called;
    });

    it('it doesn\'t remove cookie', () => {
      cookieHelper.remove(name);
      expect(removeSpy);
    });
  });

  describe('if no cookie instance passed', () => {
    class FakeCookies { constructor() {} }

    let cookiesSetSpy;
    let cookiesSetRevert;
    beforeEach(() => {
      cookiesSetSpy = sinon.spy(FakeCookies);
      cookiesSetRevert = rewire.__set__('Cookies', cookiesSetSpy);

      cookieHelper.setUpCookie();
    });

    afterEach(() => {
      cookiesSetRevert();
    });

    it('it uses imported cookie object', () => {
      expect(cookiesSetSpy).to.be.calledOnce;
    });
  });

  describe('if cookie instance passed', () => {
    beforeEach(() => {
      cookieHelper.setUpCookie(instance);
    });

    it('it uses the instance', () => {
      cookieHelper.set('test', 'test');

      expect(setSpy).to.be.calledOnce;
    });
  });

  it('sets the cookie with proper "name" and "value"', () => {
    cookieHelper.set('value', 'name');

    expect(setSpy.withArgs('name', 'value')).to.be.calledOnce;
  });

  it('sets the cookie with proper "name", "value" and "settings"', () => {
    const settings = { test: test };
    cookieHelper.set('value', 'name', settings);

    expect(setSpy.withArgs('name', 'value', settings)).to.be.calledOnce;
  });

  it('gets the proper cookie by the "value"', () => {
    expect(cookieHelper.get('value')).to.be.eql('test-cookie');
    expect(getSpy).to.be.calledOnce;
  });

  it('removes the cookie by the "value"', () => {
    cookieHelper.remove('name');

    expect(removeSpy.withArgs('name')).to.be.calledOnce;
  });

  it('removes the cookie by the "value" and pass through "settings"', () => {
    const settings = { test: 'test' };
    cookieHelper.remove('name', settings);

    expect(removeSpy.withArgs('name', settings)).to.be.calledOnce;
  });
});
