/* eslint-disable */
import { expect } from 'chai';
import * as constants from '../../constants';
import newsReducer, { initialState } from './news';

describe('newsReducer', () => {
  it('returns initial state for no matching action', () => {
    expect(newsReducer(undefined, {})).to.be.eql(initialState);
  });

  it('returns correct state for NEWS_DATA_LOADED_RESET action', () => {
    const triggeringAction = { type: constants.NEWS_DATA_LOADED_RESET };
    const currentState = { dataLoaded: true };
    const expectedState = { dataLoaded: false };

    expect(newsReducer(currentState, triggeringAction)).to.be.eql(expectedState);
  });

  it('returns correct state for NEWS_PAGE_GET action', () => {
    const triggeringAction = { type: constants.NEWS_PAGE_GET };
    const expectedState = {
      newsListLoading: true,
      newsListError: false,
      newsListErrorMessage: ''
    };

    expect(newsReducer({}, triggeringAction)).to.be.eql(expectedState);
  });

  it('returns correct state for NEWS_PAGE_GET_SUCCESS action', () => {
    const newsList = [{ test: 'test' }];
    const nextPage = 2;
    const triggeringAction = { type: constants.NEWS_PAGE_GET_SUCCESS, payload: { nextPage, newsList } };
    const expectedState = {
      newsListLoading: false,
      newsListError: false,
      newsListErrorMessage: '',
      newsList,
      newsListNextPage: nextPage
    };

    expect(newsReducer({}, triggeringAction)).to.be.eql(expectedState);
  });

  it('returns correct state for NEWS_PAGE_GET_ERROR action', () => {
    const message = 'test';
    const triggeringAction = { type: constants.NEWS_PAGE_GET_ERROR, payload: { message } };
    const expectedState = {
      newsListLoading: false,
      newsListError: true,
      newsListErrorMessage: message
    };

    expect(newsReducer({}, triggeringAction)).to.be.eql(expectedState);
  });
});
