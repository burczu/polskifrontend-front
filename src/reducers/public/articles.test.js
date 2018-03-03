/* eslint-disable */
import { expect } from 'chai';
import * as constants from '../../constants';
import articlesReducer, { initialState } from './articles';

describe('articlesReducer', () => {
  it('returns initial state for no matching action', () => {
    expect(articlesReducer(undefined, {})).to.be.eql(initialState);
  });

  it('resets data loaded value for ARTICLES_DATA_LOADED_RESET action', () => {
    const triggeringAction = { type: constants.ARTICLES_DATA_LOADED_RESET };
    const currentState = { ...initialState, dataLoaded: true };
    const expectedState = { ...initialState };

    expect(articlesReducer(currentState, triggeringAction)).to.be.eql(expectedState);
  });

  it('returns correct state for ARTICLES_ARTICLE_GET action', () => {
    const triggeringAction = { type: constants.ARTICLES_ARTICLE_GET };
    const currentState = { ...initialState };
    const expectedState = {
      ...initialState,
      articleLoaded: false,
      articleLoading: true,
      articleError: false
    };

    expect(articlesReducer(currentState, triggeringAction)).to.be.eql(expectedState);
  });

  it('returns correct state for ARTICLES_ARTICLE_GET_SUCCESS action', () => {
    const mockArticle = { test: 'test' };
    const triggeringAction = {
      type: constants.ARTICLES_ARTICLE_GET_SUCCESS,
      payload: { article: mockArticle }
    };
    const currentState = { ...initialState, articleLoading: true };
    const expectedState ={
      ...initialState,
      articleLoaded: true,
      articleLoading: false,
      articleError: false,
      article: mockArticle
    };

    expect(articlesReducer(currentState, triggeringAction)).to.be.eql(expectedState);
  });

  it('returns correct state for ARTICLES_ARTICLE_GET_ERROR action', () => {
    const message = 'error';
    const triggeringAction = {
      type: constants.ARTICLES_ARTICLE_GET_ERROR,
      payload: { message }
    };
    const currentState = { ...initialState };
    const expectedState = {
      ...initialState,
      articleLoaded: false,
      articleLoading: false,
      articleError: true,
      articleErrorMessage: message
    };

    expect(articlesReducer(currentState, triggeringAction)).to.be.eql(expectedState);
  });
});
