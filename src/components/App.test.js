/* eslint-disable */
import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import App from './App';
import Enzyme from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = { test: 'context-value' };

const context = { insertCss: () => {}, store: mockStore(initialState) };

describe('App component', () => {
  it('renders children properly', () => {
    const wrapper = Enzyme.shallow(
      <App context={context}>
        <p id="test">test...</p>
      </App>
    );

    expect(wrapper.find('p#test')).to.have.length(1);
  });

  it('children has context', () => {
    const TempComponent = () => {
      return (
        <span>{context.store.getState().test}</span>
      );
    };

    const wrapper = Enzyme.mount(
      <App context={context}>
        <TempComponent />
      </App>
    );

    expect(wrapper.find('span').text()).to.be.eql('context-value');
  });

  describe('when component is creating', () => {
    let insertCssSpy;
    beforeEach(() => {
      insertCssSpy = sinon.spy(context, 'insertCss');
    });

    afterEach(() => {
      insertCssSpy.restore();
    });

    it('calls "insertCss" method', () => {
      Enzyme.shallow(
        <App context={context}>
          <p id="test">test...</p>
        </App>
      );

      expect(insertCssSpy).to.be.calledOnce;
    });
  });

  describe('when component is destroying', () => {
    let insertCssStub;
    let removeCssSpy;
    let timer;
    const results = { removeCss: () => {} }; // eslint-disable-line
    beforeEach(() => {
      removeCssSpy = sinon.spy(results, 'removeCss');
      insertCssStub = sinon.stub(context, 'insertCss');
      insertCssStub.returns(results.removeCss);

      timer = sinon.useFakeTimers();
    });

    afterEach(() => {
      removeCssSpy.restore();
      insertCssStub.restore();

      timer.restore();
    });

    it('it calls "removeCss" function returned from "insertCss" context method', () => {
      const wrapper = Enzyme.shallow(
        <App context={context}>
          <p id="test">test...</p>
        </App>
      );

      wrapper.unmount();
      timer.tick(100);
      expect(removeCssSpy).to.be.calledOnce;
    });

    describe('if "insertCss" context method does not return any function', () => {
      beforeEach(() => {
        insertCssStub.returns(null);
      });

      it('it doesn\'t call it', () => {
        const wrapper = Enzyme.shallow(
          <App context={context}>
            <p id="test">test...</p>
          </App>
        );

        wrapper.unmount();
        expect(removeCssSpy).to.be.not.called;
      })
    })
  });
});
