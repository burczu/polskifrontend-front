/* eslint-disable */
import { expect } from 'chai';
import * as actions from './articlesActions';
import * as constants from '../../constants';

describe('articlesActions', () => {
  it('creates an action to get articles', () => {
    const slug = 'test-slug';
    const expectedAction = {
      type: constants.ARTICLES_ARTICLE_GET,
      payload: {
        slug
      }
    };

    expect(actions.articlesArticleGet(slug)).to.be.eql(expectedAction);
  });

  it('creates an action to reset data loaded indicator', () => {
    const expectedAction = {
      type: constants.ARTICLES_DATA_LOADED_RESET
    };

    expect(actions.articlesDataLoadedReset()).to.be.eql(expectedAction);
  });
});
