/* eslint-disable */
import React from 'react';
import ArticleView from './ArticleView';
import renderer from 'react-test-renderer';
import StyleProvider from '../../../../test/StyleProvider';

describe('ArticleView component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <StyleProvider insertCss={() => {}}>
          <ArticleView isLoading={false}
                       date={new Date('2019-01-01')}
                       title="Test title"
                       href="/test"
                       blogHref="/test"
                       blogIcon="/test.img"
                       blogName="test-name"
                       description="test-description"
          />
        </StyleProvider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
