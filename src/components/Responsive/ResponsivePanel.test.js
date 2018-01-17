/* eslint-disable */
import React from 'react';
import { expect } from 'chai';
import { ResponsivePanel } from './ResponsivePanel';
import Enzyme from 'enzyme';
import ResponsiveContainer from './ResponsiveContainer';

describe('ResponsivePanel component', () => {
  it('renders ResponsiveContainer component', () => {
    const wrapper = Enzyme.shallow(
      <ResponsivePanel description="test" header="test">
        <p>test...</p>
      </ResponsivePanel>
    );

    expect(wrapper.find(ResponsiveContainer)).to.have.length(1);
  });
});
