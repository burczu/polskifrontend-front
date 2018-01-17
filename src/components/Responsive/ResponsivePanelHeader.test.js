/* eslint-disable */
import React from 'react';
import { expect } from 'chai';
import Enzyme from 'enzyme';
import { ResponsivePanelHeader } from './ResponsivePanelHeader';
import ReactImageFallback from 'react-image-fallback';

describe('ResponsivePanelHeader component', () => {
  it('renders "header" correctly', () => {
    const wrapper = Enzyme.shallow(
      <ResponsivePanelHeader header="header-test" />
    );

    expect(wrapper.find('span').text()).to.be.eql('header-test');
  });

  describe('if "showImage" and "image" props set up', () => {
    it('renders "ReactImageFallback" component', () => {
      const wrapper = Enzyme.shallow(
        <ResponsivePanelHeader header="header-test" image="test.png" showImage />
      );

      expect(wrapper.find(ReactImageFallback)).to.have.length(1);
    });

    it('it sets "alt" prop of "ReactImageFallback"', () => {
      const wrapper = Enzyme.shallow(
        <ResponsivePanelHeader header="header-test" image="test.png" showImage />
      );

      expect(wrapper.find(ReactImageFallback).prop('alt')).to.be.eql('header-test - ikona');
    });

    it('it pass "image" prop to "ReactImageFallback"', () => {
      const wrapper = Enzyme.shallow(
        <ResponsivePanelHeader header="header-test" image="test.png" showImage />
      );

      expect(wrapper.find(ReactImageFallback).prop('src')).to.be.eql('test.png');
    });

    describe('if additionally the "href" prop is set up', () => {
      it('renders anchor which uses this prop', () => {
        const wrapper = Enzyme.shallow(
          <ResponsivePanelHeader header="header-test" image="test.png" showImage href="/test" />
        );

        expect(wrapper.find('a.link').prop('href')).to.be.eql('/test');
      });

      it('and the anchor wraps the "ReactImageFallback" component', () => {
        const wrapper = Enzyme.shallow(
          <ResponsivePanelHeader header="header-test" image="test.png" showImage href="/test" />
        );

        expect(wrapper.find('a.link').childAt(0).is(ReactImageFallback)).to.be.eql(true);
      });
    });
  });
});
