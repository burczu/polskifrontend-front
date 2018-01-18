/* eslint-disable */
import { expect } from 'chai';
import * as actions from './newsActions';
import * as constants from '../../constants';

describe('newsActions', () => {
  it('creates an action to get the page of news', () => {
    const page = 1;
    const expectedAction = {
      type: constants.NEWS_PAGE_GET,
      payload: {
        page
      }
    };

    expect(actions.newsPageGet(page)).to.be.eql(expectedAction);
  });

  it('creates an action to reset data loaded indicator', () => {
    const expectedAction = {
      type: constants.NEWS_DATA_LOADED_RESET
    };

    expect(actions.newsDataLoadedReset()).to.be.eql(expectedAction);
  });
});
