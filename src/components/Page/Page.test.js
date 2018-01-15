/* eslint-disable */
import React from 'react';
import { expect } from 'chai';
import { Page } from './Page';
import Enzyme from 'enzyme';

describe('Page component', () => {
  it('shows the title passed as the prop', () => {
    const wrapper = Enzyme.shallow(
      <Page html="" title="test title" />
    );

    expect(wrapper.find('h1').text()).to.be.eql('test title');
  });

  it('renders html passed as the prop dangerously', () => {
    const html = '<p>test</p>';
    const wrapper = Enzyme.shallow(
      <Page html={html} title="test" />
    );

    expect(wrapper.html().indexOf(html)).to.not.eql(-1);
  });
});
