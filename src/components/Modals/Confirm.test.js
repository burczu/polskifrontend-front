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
});
