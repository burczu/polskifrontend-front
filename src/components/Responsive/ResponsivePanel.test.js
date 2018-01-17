/* eslint-disable */
import React from 'react';
import { expect } from 'chai';
import { ResponsivePanel } from './ResponsivePanel';
import Enzyme from 'enzyme';
import ResponsiveContainer from './ResponsiveContainer';
import ResponsivePanelHeader from './ResponsivePanelHeader';

describe('ResponsivePanel component', () => {
  it('renders ResponsiveContainer component', () => {
    const wrapper = Enzyme.shallow(
      <ResponsivePanel description="test" header="test">
        <p>test...</p>
      </ResponsivePanel>
    );

    expect(wrapper.find(ResponsiveContainer)).to.have.length(1);
  });

  it('renders ResponsivePanelHeader component', () => {
    const wrapper = Enzyme.shallow(
      <ResponsivePanel description="test" header="header">
        <p>test...</p>
      </ResponsivePanel>
    );

    expect(wrapper.find(ResponsivePanelHeader)).to.have.length(1);
  });

  it('pass "header" prop to the ResponsivePanelHeader component', () => {
    const wrapper = Enzyme.shallow(
      <ResponsivePanel description="test" header="header-test">
        <p>test...</p>
      </ResponsivePanel>
    );

    expect(wrapper.find(ResponsivePanelHeader).prop('header')).to.be.eql('header-test');
  });

  it('pass "showImage" prop to the ResponsivePanelHeader component', () => {
    const wrapper = Enzyme.shallow(
      <ResponsivePanel description="test" header="header-test" showImage>
        <p>test...</p>
      </ResponsivePanel>
    );

    expect(wrapper.find(ResponsivePanelHeader).prop('showImage')).to.be.eql(true);
  });

  it('pass "image" prop to the ResponsivePanelHeader component', () => {
    const wrapper = Enzyme.shallow(
      <ResponsivePanel description="test" header="header-test" image="image-test">
        <p>test...</p>
      </ResponsivePanel>
    );

    expect(wrapper.find(ResponsivePanelHeader).prop('image')).to.be.eql('image-test');
  });

  it('pass "href" prop to the ResponsivePanelHeader component', () => {
    const wrapper = Enzyme.shallow(
      <ResponsivePanel description="test" header="header-test" image="image-test" href="/test">
        <p>test...</p>
      </ResponsivePanel>
    );

    expect(wrapper.find(ResponsivePanelHeader).prop('href')).to.be.eql('/test');
  });

  it('renders "description" properly', () => {
    const wrapper = Enzyme.shallow(
      <ResponsivePanel description="description-test" header="test">
        <p>test...</p>
      </ResponsivePanel>
    );

    expect(wrapper.find('p.wrapper__description').text()).to.be.eql('description-test');
  });

  it('renders "children" properly', () => {
    const wrapper = Enzyme.shallow(
      <ResponsivePanel description="description-test" header="test">
        <p id="test-id">test...</p>
      </ResponsivePanel>
    );

    expect(wrapper.find('p#test-id')).to.have.length(1);
  });
});
