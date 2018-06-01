/* eslint-disable */
import React from 'react';
import Articles from './Articles';
import renderer from 'react-test-renderer';
import StyleProvider from '../../../test/StyleProvider';
import configureStore from 'redux-mock-store';

describe('Articles component', () => {
  const mockBlog = {
    name: 'mock name',
    favicon: 'mock favicon',
    href: 'mock href',
    date: 'mock date'
  };
  const mockArticle = {
    title: 'mock title',
    description: 'mock description',
    blog: mockBlog,
    href: 'mock href',
    date: new Date('2018-01-01')
  };
  const mockState = {
    article: mockArticle,
    articleLoading: false
  };

  const mockStore = configureStore([]);

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <StyleProvider insertCss={() => {}}>
          <Articles articlesState={mockState} context={{ path: 'mock path' }} store={mockStore(mockState)} />
        </StyleProvider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
