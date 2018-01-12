/* eslint-disable */
import React from 'react';
import { expect } from 'chai';
import { Loader } from './Loader';
import PropTypes from 'prop-types';
import Enzyme from 'enzyme';

const options = {
  context: {
    insertCss: () => {}
  },
  childContextTypes: {
    insertCss: PropTypes.func.isRequired
  }
};

describe('Loader component', () => {
  describe('if isLoading attribute is set to "true"', () => {
    it('it shows loading image', () => {
      const wrapper = Enzyme.shallow(
        <Loader isLoading>
          <div id="test">Test!</div>
        </Loader>
      );

      expect(wrapper.find('img')).to.have.length(1);
    })
  });

  describe('if isLoading attribute is set to "false', () => {
    it('it shows children', () => {
      const wrapper = Enzyme.shallow(
        <Loader isLoading={false}>
          <div id="test">Test!</div>
        </Loader>
      );

      expect(wrapper.find('div#test')).to.have.length(1);
    });
  });
});
