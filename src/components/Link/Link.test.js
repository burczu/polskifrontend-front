/* eslint-disable */
import React from 'react';
import { expect } from 'chai';
import Link, { isModifiedEvent, isLeftClickEvent, __RewireAPI__ as rewire } from './Link';
import Enzyme from 'enzyme';
import sinon from 'sinon';
import history from '../../core/history';

describe('Link component', () => {
  it('sets "href" property based on the "to" prop', () => {
    const wrapper = Enzyme.shallow(
      <Link to="test">Test</Link>
    );

    expect(wrapper.find('a[href="test"]')).to.have.length(1);
  });

  describe('if clicked', () => {
    const handlers = { click: () => {} };
    const event = { preventDefault: () => {} };
    let clickSpy;
    let isModifiedSpy;
    let isModifiedRevert;
    let isLeftClickSpy;
    let isLeftClickRevert;
    let historyPushSpy;
    let eventPreventSpy;

    beforeEach(() => {
      clickSpy = sinon.spy(handlers, 'click');

      isModifiedSpy = sinon.spy(isModifiedEvent);
      isModifiedRevert = rewire.__set__('isModifiedEvent', isModifiedSpy);

      isLeftClickSpy = sinon.spy(isLeftClickEvent);
      isLeftClickRevert = rewire.__set__('isLeftClickEvent', isLeftClickSpy);

      historyPushSpy = sinon.spy(history, 'push');
      eventPreventSpy = sinon.spy(event, 'preventDefault');
    });

    afterEach(() => {
      clickSpy.restore();
      isModifiedRevert();
      isLeftClickRevert();
      historyPushSpy.restore();
      eventPreventSpy.restore();
    });

    it('calls event handler passed as prop', () => {
      const wrapper = Enzyme.shallow(
        <Link to="test" onClick={handlers.click}>Test</Link>
      );

      wrapper.simulate('click', {});
      expect(clickSpy).to.be.calledOnce;
    });

    it('calls "isModifiedEvent" method', () => {
      const wrapper = Enzyme.shallow(
        <Link to="test" onClick={handlers.click}>Test</Link>
      );

      wrapper.simulate('click', {});
      expect(isModifiedSpy).to.be.calledOnce;
    });

    it('calls "isLeftClickEvent" method', () => {
      const wrapper = Enzyme.shallow(
        <Link to="test" onClick={handlers.click}>Test</Link>
      );

      wrapper.simulate('click', {});
      expect(isLeftClickSpy).to.be.called;
    });

    it('don\'t change the route if event is modified', () => {
      const wrapper = Enzyme.shallow(
        <Link to="test" onClick={handlers.click}>Test</Link>
      );

      wrapper.simulate('click', { metaKey: true });
      expect(historyPushSpy).to.not.be.called;
    });

    it('don\'t change the route if event isn\'t modified but not left clicked', () => {
      const wrapper = Enzyme.shallow(
        <Link to="test" onClick={handlers.click}>Test</Link>
      );

      wrapper.simulate('click', { button: 1 });
      expect(historyPushSpy).to.not.be.called;
    });

    it('don\'t change the route if default prvented', () => {
      const wrapper = Enzyme.shallow(
        <Link to="test" onClick={handlers.click}>Test</Link>
      );

      wrapper.simulate('click', { defaultPrevented: true });
      expect(historyPushSpy).to.not.be.called;
    });

    it('prevents default behaviour of the anchor', () => {
      const wrapper = Enzyme.shallow(
        <Link to="test" onClick={handlers.click}>Test</Link>
      );

      wrapper.simulate('click', { ...event, button: 0 });
      expect(eventPreventSpy).to.be.called;
    });

    it('pushes history to the address passed by the "to" attribute', () => {
      const wrapper = Enzyme.shallow(
        <Link to="test" onClick={handlers.click}>Test</Link>
      );

      wrapper.simulate('click', { ...event, button: 0 });
      expect(historyPushSpy.withArgs('test')).to.be.calledOnce;
    });
  });

  describe('has also functions:', () => {
    it('"isLeftClickEvent" returns "true" i button key is 0', () => {
      expect(isLeftClickEvent({ button: 0 })).to.be.eql(true);
    });

    it('"isLeftClickEvent" returns "false" i button key is different than 0', () => {
      expect(isLeftClickEvent({ button: 10 })).to.be.eql(false);
    });

    it('"isModifiedEvent" returns "true" when event has "metaKey"', () => {
      expect(isModifiedEvent({ metaKey: true })).to.be.eql(true);
    });

    it('"isModifiedEvent" returns "true" when event has "altKey"', () => {
      expect(isModifiedEvent({ altKey: true })).to.be.eql(true);
    });

    it('"isModifiedEvent" returns "true" when event has "ctrlKey"', () => {
      expect(isModifiedEvent({ ctrlKey: true })).to.be.eql(true);
    });

    it('"isModifiedEvent" returns "true" when event has "shiftKey"', () => {
      expect(isModifiedEvent({ shiftKey: true })).to.be.eql(true);
    });

    it('"isModifiedEvent" returns "false" when event has no modified keys', () => {
      expect(isModifiedEvent({ })).to.be.eql(false);
    });
  });
});
