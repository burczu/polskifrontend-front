/* eslint-disable */
import React from 'react';
import Enzyme from 'enzyme';
import { expect } from 'chai';
import { Header } from './Header';
import PropTypes from 'prop-types';
import sinon from 'sinon';
import Link from '../Link/Link';
import { mount } from 'enzyme/build/index';
import RetinaImage from 'react-retina-image';

const options = {
  context: {
    insertCss: () => {}
  },
  childContextTypes: {
    insertCss: PropTypes.func.isRequired
  }
};

describe('Header component', () => {
  it('has initial state', () => {
    const wrapper = Enzyme.shallow(
      <Header />,
      options
    );

    expect(wrapper.state().scrolled).to.be.eql(false);
  });

  describe('when is mounted', () => {
    let listenerSpy;
    beforeEach(() => {
      listenerSpy = sinon.spy(window, 'addEventListener');
    });

    afterEach(() => {
      listenerSpy.restore();
    });

    it('it subscribes to scroll event listener', () => {
      const wrapper = Enzyme.shallow(
        <Header />,
        options
      );

      wrapper.unmount();
      expect(listenerSpy).to.be.called;
    });
  });

  describe('when window is scrolled for more than 250px', () => {
    let listenerStub;
    const map = {};
    beforeEach(() => {
      listenerStub = sinon.stub(window, 'addEventListener');
      listenerStub.callsFake((event, callback) => {
        map[event] = callback;
      });
    });

    afterEach(() => {
      listenerStub.restore();
    });

    it('the state is changed', () => {
      const wrapper = Enzyme.shallow(
        <Header />,
        options
      );

      map.scroll({ target: { documentElement: { scrollTop: 300 } } });
      expect(wrapper.state().scrolled).to.be.eql(true);
    })
  });

  describe('when is destroying', () => {
    let listenerSpy;
    beforeEach(() => {
      listenerSpy = sinon.spy(window, 'removeEventListener');
    });

    afterEach(() => {
      listenerSpy.restore();
    });

    it('it un-subscribes from event listener', () => {
      const wrapper = Enzyme.shallow(
        <Header />,
        options
      );

      wrapper.unmount();
      expect(listenerSpy).to.be.called;
    });
  });

  it('has link which points to the home page', () => {
    const wrapper = mount(
      <Header />,
      options
    );

    expect(wrapper.find(Link).get(0).props.to).to.eql('/');
  });

  it('renders a RetinaImage component', () => {
    const wrapper = Enzyme.mount(
      <Header />,
      options
    );

    expect(wrapper.find(RetinaImage)).to.have.length(1);
  });
});
