/* eslint-disable */
import React from 'react';
import { expect } from 'chai';
import { Confirm } from './Confirm';
import Enzyme from 'enzyme';
import sinon from 'sinon';
import ResponsivePanel from '../Responsive/ResponsivePanel';

describe('Confirm component', () => {
  it('renders ResponsivePanel component', () => {
    const wrapper = Enzyme.shallow(
      <Confirm isVisible onCancelClick={() => {}} onConfirmClick={() => {}} question="test" />
    );

    expect(wrapper.find(ResponsivePanel)).to.have.length(1);
  });

  describe('if sets "isVisible" prop to "true"', () => {
    it('it shows the container', () => {
      const wrapper = Enzyme.shallow(
        <Confirm isVisible onCancelClick={() => {}} onConfirmClick={() => {}} question="test" />
      );

      expect(wrapper.find('div.container--visible')).to.have.length(1);
    });
  });

  describe('if sets "isVisible" prop to "false"', () => {
    it('it doesn\'t show the container', () => {
      const wrapper = Enzyme.shallow(
        <Confirm isVisible={false} onCancelClick={() => {}} onConfirmClick={() => {}} question="test"/>
      );

      expect(wrapper.find('div.container--visible')).to.have.length(0);
    })
  });

  describe('if "header" prop is not set', () => {
    it('it pass default header to the ResponsivePanel component', () => {
      const wrapper = Enzyme.shallow(
        <Confirm isVisible onCancelClick={() => {}} onConfirmClick={() => {}} question="test" />
      );

      expect(wrapper.find(ResponsivePanel).prop('header')).to.be.eql('Prośba o potwierdzenie');
    });
  });

  describe('if "header" prop is set', () => {
    it('it pass this value to the ResponsivePanel component', () => {
      const wrapper = Enzyme.shallow(
        <Confirm isVisible onCancelClick={() => {}} onConfirmClick={() => {}} question="test" header="test header" />
      );

      expect(wrapper.find(ResponsivePanel).prop('header')).to.be.eql('test header');
    });
  });

  describe('if "Cancel" button clicked', () => {
    const handlers = { cancel: () => {}, confirm: () => {} };
    let cancelClickSpy;
    beforeEach(() => {
      cancelClickSpy = sinon.spy(handlers, 'cancel');
    });

    afterEach(() => {
      cancelClickSpy.restore();
    });

    it('it calls the "onCancelClick" event handler', () => {
      const wrapper = Enzyme.shallow(
        <Confirm isVisible onCancelClick={handlers.cancel} onConfirmClick={handlers.confirm} question="test" />
      );

      wrapper.find('button.panel__button--cancel').simulate('click');
      expect(cancelClickSpy).to.be.called;
    });
  });

  describe('if "Confirm" button clicked', () => {
    const handlers = { cancel: () => {}, confirm: () => {} };
    let confirmClickSpy;
    beforeEach(() => {
      confirmClickSpy = sinon.spy(handlers, 'confirm');
    });

    afterEach(() => {
      confirmClickSpy.restore();
    });

    it('it calls the "onConfirmClick" event handler', () => {
      const wrapper = Enzyme.shallow(
        <Confirm isVisible onCancelClick={handlers.cancel} onConfirmClick={handlers.confirm} question="test" />
      );

      wrapper.find('div.panel__buttons').childAt(1).simulate('click');
      expect(confirmClickSpy).to.be.called;
    });
  });
});
