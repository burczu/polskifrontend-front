/* eslint-disable */
import React from 'react';
import Enzyme from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { CookieInfo } from './CookieInfo';
import PropTypes from 'prop-types';
import cookies from '../../core/helpers/cookieHelper';

const options = {
  context: {
    insertCss: () => {}
  },
  childContextTypes: {
    insertCss: PropTypes.func.isRequired
  }
};

describe('CookieInfo component', () => {
  it('has initial state property "shouldBeClosed" set to "false"', () => {
    const wrapper = Enzyme.mount(
      <CookieInfo />,
      options
    );

    expect(wrapper.state().shouldBeClosed).to.be.eql(false);
  });

  describe('when the "OK" button is clicked', () => {
    let cookieSpy;
    beforeEach(() => {
      cookieSpy = sinon.spy(cookies, 'set');
    });

    afterEach(() => {
      cookieSpy.restore();
    });

    it('sets up cookie', () => {
      const wrapper = Enzyme.mount(
        <CookieInfo />,
        options
      );

      wrapper.find('button.container__button').simulate('click');
      expect(cookieSpy).to.be.calledOnce;
    });

    it('change the inner state value', () => {
      const wrapper = Enzyme.mount(
        <CookieInfo />,
        options
      );

      wrapper.find('button.container__button').simulate('click');
      expect(wrapper.state().shouldBeClosed).to.be.eql(true);
    });
  });

  describe('if there is cookie already set up', () => {
    let cookieStub;
    beforeEach(() => {
      cookieStub = sinon.stub(cookies, 'get');
      cookieStub.withArgs('cookie-accepted').returns(true);
    });

    afterEach(() => {
      cookieStub.restore();
    });

    it('has initial state property "shouldBeClosed" set to the value taken from cookie', () => {
      const wrapper = Enzyme.mount(
        <CookieInfo />,
        options
      );

      expect(wrapper.state().shouldBeClosed).to.be.eql(true);
    });
  });
});
