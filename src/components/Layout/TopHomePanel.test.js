/* eslint-disable */
import React from 'react';
import { expect } from 'chai';
import PropTypes from 'prop-types';
import { mount } from 'enzyme/build/index';
import TopHomePanel from './TopHomePanel';
import Link from '../Link/Link';
import RetinaImage from 'react-retina-image';

describe('TopHomePanel component', () => {
  const options = {
    context: {
      insertCss: () => {}
    },
    childContextTypes: {
      insertCss: PropTypes.func.isRequired
    }
  };

  it('has a link pointing to the home page', () => {
    const wrapper = mount(
      <TopHomePanel />,
      options
    );

    expect(wrapper.find(Link).prop('to')).to.eql('/');
  });

  it('renders a RetinaImage component', () => {
    const wrapper = mount(
      <TopHomePanel />,
      options
    );

    expect(wrapper.find(RetinaImage)).to.have.length(1);
  });
});
