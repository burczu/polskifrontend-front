/* eslint-disable */
import React from 'react';
import { expect } from 'chai';
import { Message } from './Message';
import Enzyme from 'enzyme';
import sinon from 'sinon';

describe('Message component', () => {
  it('sets the state based on props property "isVisible"', () => {
    const wrapper = Enzyme.shallow(
      <Message isVisible message="Message" type="info" />
    );

    expect(wrapper.state().isMessageVisible).to.be.true;
  });

  it('changes the state based on the change of the prop property "isVisible"', () => {
    const wrapper = Enzyme.shallow(
      <Message isVisible message="Message" type="info" />
    );

    wrapper.setProps({ isVisible: false });
    expect(wrapper.state().isMessageVisible).to.be.false;
  });

  describe('if state property "isMessageVisible" changes from "false" to "true"', () => {
    let setTimeoutSpy;
    let clearTimeoutSpy;
    let clock;
    beforeEach(() => {
      clock = sinon.useFakeTimers();
      setTimeoutSpy = sinon.spy(window, 'setTimeout');
      clearTimeoutSpy = sinon.spy(window, 'clearTimeout');
    });

    afterEach(() => {
      clock.restore();
      setTimeoutSpy.restore();
      clearTimeoutSpy.restore();
    });

    it('it calls "setTimeout" function', () => {
      const wrapper = Enzyme.shallow(
        <Message isVisible={false} message="Test" type="info" />
      );

      wrapper.setState({ isMessageVisible: true });
      expect(setTimeoutSpy).to.be.called;
    });

    it('it changes state prop "isMessageVisible" back to "false" after 6sek', () => {
      const wrapper = Enzyme.shallow(
        <Message isVisible={false} message="Test" type="info" />
      );

      wrapper.setState({ isMessageVisible: true });
      clock.tick(6100);
      expect(wrapper.state().isMessageVisible).to.be.false;
    });

    it('it doesn\'t change the state prop "isMessageVisible" back to "false" before 6sek', () => {
      const wrapper = Enzyme.shallow(
        <Message isVisible={false} message="Test" type="info" />
      );

      wrapper.setState({ isMessageVisible: true });
      clock.tick(4100);
      expect(wrapper.state().isMessageVisible).to.be.true;
    });

    it('it calls "clearTimeout" if the state changes before 6sek', () => {
      const wrapper = Enzyme.shallow(
        <Message isVisible={false} message="Test" type="info" />
      );

      wrapper.setState({ isMessageVisible: true });
      clock.tick(3000);
      wrapper.setState({ isMessageVisible: false });
      expect(clearTimeoutSpy).to.be.called;
    });
  });

  it('renders "info" class when the type is "info"', () => {
    const wrapper = Enzyme.shallow(
      <Message isVisible message="Message" type="info" />
    );

    expect(wrapper.hasClass('container--info')).to.be.true;
  });

  it('renders "message" class when the type is "message"', () => {
    const wrapper = Enzyme.shallow(
      <Message isVisible message="Message" type="message" />
    );

    expect(wrapper.hasClass('container--message')).to.be.true;
  });

  it('renders "alert" class when the type is "alert"', () => {
    const wrapper = Enzyme.shallow(
      <Message isVisible message="Message" type="alert" />
    );

    expect(wrapper.hasClass('container--alert')).to.be.true;
  });

  it('renders "visible" class when the "isMessageVisible" state prop is set to "true"', () => {
    const wrapper = Enzyme.shallow(
      <Message isVisible message="Message" type="info" />
    );

    expect(wrapper.hasClass('container--visible')).to.be.true;
  });

  it('does not render "visible" class when the "isMessageVisible" state prop is set to "false"', () => {
    const wrapper = Enzyme.shallow(
      <Message isVisible={false} message="Message" type="info" />
    );

    expect(wrapper.hasClass('container--visible')).to.be.false;
  });
});
