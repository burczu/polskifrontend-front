/* eslint-disable */
import React from 'react';
import Enzyme from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import index from './index';
import renderer from 'react-test-renderer';
import StyleProvider from '../../../test/StyleProvider';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

describe('an about route index', () => {
  const mockConfigureStore = configureStore([]);
  const mockState = {
    newsState: {
      newsList: []
    }
  };

  const mockStore = mockConfigureStore(mockState);

  it('exports an object with correct path', () => {
    const expectedPath = '/o-serwisie';

    expect(index.path).to.be.eql(expectedPath);
  });

  it('exports an action which renders correct component', async() => {
    const action = await index.action({});
    const Component = action.component.type;
    console.log(mockStore.getState());
    const tree = renderer
      .create(
        <StyleProvider insertCss={() => {}}>
          <Component store={mockStore} />
        </StyleProvider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
