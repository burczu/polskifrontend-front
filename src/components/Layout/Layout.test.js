/* eslint-disable */
import React from 'react';
import { expect, use } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import App from '../App';
import Layout from './Layout';
import Header from '../Header/Header';
import TopHomeLinks from './TopHomeLinks';

configure({ adapter: new Adapter() });
use(sinonChai);

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
  newsState: {
    newsList: []
  }
};

describe('Layout', () => {
  const store = mockStore(initialState);

  it('renders children correctly', () => {
    const wrapper = shallow(
      <App context={{ insertCss: () => {}, store }}>
        <Layout>
          <div className="child" />
        </Layout>
      </App>
    );

    expect(wrapper.find('div.child').length).to.eq(1);
  });

  it('renders Header component', () => {
    const wrapper = mount(
      <App context={{ insertCss: () => {}, store }}>
        <Layout newsState={initialState.newsState}>
          <div>Test</div>
        </Layout>
      </App>
    );

    expect(wrapper.find(Header)).to.have.length(1);
  });

  it('renders TopHomeLinks component', () => {
    const wrapper = mount(
      <App context={{ insertCss: () => {}, store }}>
        <Layout newsState={initialState.newsState}>
          Test...
        </Layout>
      </App>
    );

    expect(wrapper.find(TopHomeLinks)).to.have.length(1);
  });

  describe('when called with no children', () => {
    let consoleStub;
    beforeEach(() => {
      consoleStub = sinon.stub(console, 'error');
    });

    afterEach(() => {
      console.error.restore();
    });

    it('calls console.error to the console', () => {
      mount(
        <App context={{ insertCss: () => {}, store }}>
          <Layout newsState={initialState.newsState} />
        </App>
      );

      expect(console.error).to.be.calledOnce;
    });
  });
});
