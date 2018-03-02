/* eslint-disable */
import { expect } from 'chai';
import * as actions from './homeActions';
import * as constants from '../../constants';

describe('homeActions', () => {
  it('creates an action for getting blog list', () => {
    const page = 1;
    const expectedAction = {
      type: constants.HOME_BLOG_LIST_GET_REQUEST,
      payload: {
        page
      }
    };

    expect(actions.homeBlogListGetRequest(page)).to.be.eql(expectedAction);
  });

  it('creates an action for getting article list', () => {
    const page = 1;
    const expectedAction = {
      type: constants.HOME_ARTICLE_LIST_GET_REQUEST,
      payload: {
        page
      }
    };

    expect(actions.homeArticleListGetRequest(page)).to.be.eql(expectedAction);
  });

  it('creates an action for adding link to clicked list', () => {
    const url = '/test';
    const expectedAction = {
      type: constants.HOME_LINK_TO_CLICKED_ADD,
      payload: {
        url
      }
    };

    expect(actions.homeAddLinkToClicked(url)).to.be.eql(expectedAction);
  });

  it('creates an action to reset data loaded indicator', () => {
    const expectedAction = {
      type: constants.HOME_DATA_LOADED_RESET
    };

    expect(actions.homeDataLoadedReset()).to.be.eql(expectedAction);
  });
});
