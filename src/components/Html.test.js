/* eslint-disable */
import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import Html from './Html';
import Enzyme from 'enzyme';
import serialize from 'serialize-javascript';

describe('Html component', () => {
  const childrenHtml = '<p id="test">test...</p>';
  const fakeHelmet = {
    title: {
      toComponent: () => 'test'
    },
    meta: {
      toComponent: () => 'test'
    }
  };

  it('dangerously render children as HTML', () => {
    const wrapper = Enzyme.shallow(
      <Html helmet={fakeHelmet} title="test" children={childrenHtml} />
    );

    expect(wrapper.html().indexOf(childrenHtml)).to.not.eql(-1);
  });

  it('renders script tags using passed script paths', () => {
    const wrapper = Enzyme.shallow(
      <Html helmet={fakeHelmet}
            title="test"
            children={childrenHtml}
            scripts={['/test-1.js', '/test-2.js']}
      />
    );

    expect(wrapper.find('script[src="/test-1.js"]')).to.have.length(1);
    expect(wrapper.find('script[src="/test-2.js"]')).to.have.length(1);
  });

  it('renders styles inline', () => {
    const styles = [{
      id: '1',
      cssText: 'p { background: red }'
    }, {
      id: '2',
      cssText: 'a { border: none }'
    }];
    const wrapper = Enzyme.shallow(
      <Html helmet={fakeHelmet}
            title="test"
            children={childrenHtml}
            styles={styles}
      />
    );

    expect(wrapper.html().indexOf(styles[0].cssText)).to.not.eql(-1);
    expect(wrapper.html().indexOf(styles[1].cssText)).to.not.eql(-1);
  });

  it('saves redux state in the string', () => {
    const fakeState = { test: 1 };
    const wrapper = Enzyme.shallow(
      <Html helmet={fakeHelmet}
            title="test"
            children={childrenHtml}
            state={fakeState}
      />
    );

    expect(wrapper.html().indexOf(`window.APP_STATE=${serialize(fakeState, { isJSON: true })}`)).to.not.eql(-1);
  });
});
