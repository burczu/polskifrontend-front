/* eslint-disable */
import React from 'react';
import Enzyme from 'enzyme';
import { expect } from 'chai';
import { Footer } from './Footer';
import PropTypes from 'prop-types';

const options = {
  context: {
    insertCss: () => {}
  },
  childContextTypes: {
    insertCss: PropTypes.func.isRequired
  }
};

describe('Footer component', () => {
  it('has year set up to the correct value', () => {
    const wrapper = Enzyme.shallow(
      <Footer />,
      options
    );

    const year = (new Date).getFullYear();
    expect(wrapper.state().currentYear).to.be.eql(year);
  });
});
