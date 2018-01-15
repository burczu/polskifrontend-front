/* eslint-disable */
import React from 'react';
import { expect } from 'chai';
import { ResponsiveContainer } from './ResponsiveContainer';
import Enzyme from 'enzyme';

describe('ResponsiveContainer component', () => {
  it('renders children correctly', () => {
    const wrapper = Enzyme.shallow(
      <ResponsiveContainer>
        <div id="test">test</div>
      </ResponsiveContainer>
    );

    expect(wrapper.find('div#test')).to.have.length(1);
  });

  it('adds to the container class passed to the "className" prop', () => {
    const wrapper = Enzyme.shallow(
      <ResponsiveContainer className="test-class">
        <p>test...</p>
      </ResponsiveContainer>
    );

    expect(wrapper.find('div.test-class')).to.have.length(1);
  });
});
