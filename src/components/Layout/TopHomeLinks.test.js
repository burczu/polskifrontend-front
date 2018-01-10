/* eslint-disable */
import React from 'react';
import { expect } from 'chai';
import Enzyme from 'enzyme';
import TopHomeLinks from './TopHomeLinks';
import PropTypes from 'prop-types';
import { mount } from 'enzyme/build/index';
import sinon from 'sinon';
import Link from '../Link/Link';

describe('TopHomeLinks component', () => {
  let consoleStub;
  beforeEach(() => {
    consoleStub = sinon.stub(console, 'error');
  });

  afterEach(() => {
    consoleStub.restore();
  });

  const options = {
    context: {
      insertCss: () => {}
    },
    childContextTypes: {
      insertCss: PropTypes.func.isRequired
    }
  };

  it('shows news count indicator when news count is higher than 0', () => {
    const wrapper = Enzyme.mount(
      <TopHomeLinks newNewsCount={1} />,
      options
    );

    expect(wrapper.find('div.list__info')).to.have.length(1);
  });

  it('shows no news count indincator when news count is equal to 0', () => {
    const wrapper = Enzyme.mount(
      <TopHomeLinks newNewsCount={0}/>,
      options
    );

    expect(wrapper.find('div.list__info')).to.have.length(0);
  });

  it('calls console.error function when no "currentPath" provided', () => {
    mount(
      <TopHomeLinks />,
      options
    );

    expect(console.error).to.be.calledOnce;
  });

  it('has link which points to /aktualnosci path', () => {
    const wrapper = mount(
      <TopHomeLinks newNewsCount={0} />,
      options
    );

    expect(wrapper.find(Link).get(0).props.to).to.eql('/aktualnosci');
  });

  it('has link which point to /o-serwisie path', () => {
    const wrapper = mount(
      <TopHomeLinks newNewsCount={0} />,
      options
    );

    expect(wrapper.find(Link).get(1).props.to).to.eql('/o-serwisie');
  });

  it('has link which point to /zglos-uwagi path', () => {
    const wrapper = mount(
      <TopHomeLinks newNewsCount={0} />,
      options
    );

    expect(wrapper.find(Link).get(2).props.to).to.eql('/zglos-uwagi');
  });

  it('has link which point to the Facebook fanpage of the service', () => {
    const wrapper = mount(
      <TopHomeLinks newNewsCount={0} />,
      options
    );

    expect(wrapper.find('a').get(3).props.href).to.eql('https://www.facebook.com/polskifrontend/');
  });
});
