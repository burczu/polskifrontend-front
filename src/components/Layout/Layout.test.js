/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { expect } from 'chai';
import sinon from 'sinon';
import Enzyme from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Layout from './Layout';
import Header from '../Header/Header';
import TopHomeLinks from './TopHomeLinks';
import TopHomePanel from './TopHomePanel';
import Footer from '../Footer/Footer';
import CookieInfo from '../Cookie/CookieInfo';
import settingsHelper from '../../core/helpers/settingsHelper';
import dateHelper from '../../core/helpers/dateHelper';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
  newsState: {
    newsList: [{ date: '2018-01-01' }]
  }
};

describe('Layout component', () => {
  let settingsStub;
  let dateHelperStub;
  const store = mockStore(initialState);
  const options = {
    context: {
      insertCss: () => {},
      store
    },
    childContextTypes: {
      insertCss: PropTypes.func.isRequired,
      store: PropTypes.object.isRequired
    }
  };

  beforeAll(() => {
    settingsStub = sinon.stub(settingsHelper, 'getSettings');
    settingsStub.callsFake(() => ({ lastNewsVisit: '2017-12-31' }));

    dateHelperStub = sinon.stub(dateHelper, 'isThisWeek');
    dateHelperStub.callsFake(() => true);
  });

  afterAll(() => {
    settingsStub.restore();
    dateHelperStub.restore();
  });

  it('renders children correctly', () => {
    const wrapper = Enzyme.shallow(
      <Layout>
        <div className="child" />
      </Layout>,
      options
    );

    expect(wrapper.find('div.child').length).to.eq(1);
  });

  it('renders Header component', () => {
    const wrapper = Enzyme.mount(
      <Layout newsState={initialState.newsState}>
        <div>Test</div>
      </Layout>,
      options
    );

    expect(wrapper.find(Header)).to.have.length(1);
  });

  it('renders TopHomeLinks component', () => {
    const wrapper = Enzyme.mount(
      <Layout newsState={initialState.newsState}>
        Test...
      </Layout>,
      options
    );

    expect(wrapper.find(TopHomeLinks)).to.have.length(1);
  });

  it('renders TopHomePanel component', () => {
    const wrapper = Enzyme.mount(
      <Layout newsState={initialState.newsState}>
        Test...
      </Layout>,
      options
    );

    expect(wrapper.find(TopHomePanel)).to.have.length(1);
  });

  it('renders Footer component', () => {
    const wrapper = Enzyme.mount(
      <Layout newsState={initialState.newsState}>
        Test...
      </Layout>,
      options
    );

    expect(wrapper.find(Footer)).to.have.length(1);
  });

  it('renders Cookie component', () => {
    const wrapper = Enzyme.mount(
      <Layout newsState={initialState.newsState}>
        Test...
      </Layout>,
      options
    );

    expect(wrapper.find(CookieInfo)).to.have.length(1);
  });

  it('pass correct value to the TopHomeLinks component', () => {
    const wrapper = Enzyme.mount(
      <Layout newsState={initialState.newsState}>
        Test...
      </Layout>,
      options
    );

    expect(wrapper.find(TopHomeLinks).prop('newNewsCount')).to.eql(1);
  });
});
