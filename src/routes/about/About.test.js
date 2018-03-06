/* eslint-disable */
import React from 'react';
import About from './About';
import renderer from 'react-test-renderer';
import StyleProvider from '../../../test/StyleProvider';

describe('About component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <StyleProvider insertCss={() => {}}>
          <About context={{ path: '/test' }} />
        </StyleProvider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
