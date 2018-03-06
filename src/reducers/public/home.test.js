/* eslint-disable */
import { expect } from 'chai';
import * as constants from '../../constants';
import homeReducer, { initialState } from './home';

describe('homeReducer', () => {
  it('returns initial state for no matching action', () => {
    expect(homeReducer(undefined, {})).to.be.eql(initialState);
  });

  it('returns correct state for HOME_DATA_LOADED_RESET action', () => {
    const triggeringAction = { type: constants.HOME_DATA_LOADED_RESET };
    const currentState = { dataLoaded: true };
    const expectedState = { dataLoaded: false };

    expect(homeReducer(currentState, triggeringAction)).to.be.eql(expectedState);
  });

  it('returns correct state for HOME_BLOG_LIST_GET action', () => {
    const blogList = [];
    const triggeringAction = { type: constants.HOME_BLOG_LIST_GET, payload: { blogList } };
    const expectedState = {
      blogList,
      blogListLoading: true,
      blogListError: false,
      blogListErrorMessage: ''
    };

    expect(homeReducer({}, triggeringAction)).to.be.eql(expectedState);
  });

  it('returns correct state for HOME_BLOG_LIST_GET_SUCCESS action', () => {
    const blogs = [{ test: 'test' }];
    const nextPage = 2;
    const triggeringAction = { type: constants.HOME_BLOG_LIST_GET_SUCCESS, payload: { blogs, nextPage } };
    const expectedState = {
      blogList: blogs,
      blogListNextPage: nextPage,
      blogListLoading: false,
      blogListError: false,
      blogListErrorMessage: '',
      isTilesOptionSelected: true,
      isListOptionSelected: false
    };

    expect(homeReducer({}, triggeringAction)).to.be.eql(expectedState);
  });

  it('returns correct state for HOME_BLOG_LIST_GET_ERROR action', () => {
    const message = 'test';
    const triggeringAction = { type: constants.HOME_BLOG_LIST_GET_ERROR, payload: { message } };
    const expectedState = {
      blogListLoading: false,
      blogListError: true,
      blogListErrorMessage: message
    };

    expect(homeReducer({}, triggeringAction)).to.be.eql(expectedState);
  });

  it('returns correct state for HOME_ARTICLE_LIST_GET action', () => {
    const articlesList = [{ test: 'test' }];
    const triggeringAction = { type: constants.HOME_ARTICLE_LIST_GET, payload: { articlesList } };
    const expectedState = {
      allArticlesListLoading: true,
      allArticlesList: articlesList,
      allArticlesListError: false,
      allArticlesListErrorMessage: ''
    };

    expect(homeReducer({}, triggeringAction)).to.be.eql(expectedState);
  });

  it('returns correct state for HOME_ARTICLE_LIST_GET_SUCCESS action', () => {
    const articles = [{ test: 'test' }];
    const nextPage = 2;
    const triggeringAction = { type: constants.HOME_ARTICLE_LIST_GET_SUCCESS, payload: { articles, nextPage } };
    const expectedState = {
      allArticlesList: articles,
      allArticlesNextPage: nextPage,
      allArticlesListLoading: false,
      allArticlesListError: false,
      allArticlesListErrorMessage: '',
      isTilesOptionSelected: false,
      isListOptionSelected: true
    };

    expect(homeReducer({}, triggeringAction)).to.be.eql(expectedState);
  });

  it('returns correct state for HOME_ARTICLE_LIST_GET_ERROR action', () => {
    const message = 'test';
    const triggeringAction = { type: constants.HOME_ARTICLE_LIST_GET_ERROR, payload: { message } };
    const expectedState = {
      allArticlesListLoading: false,
      allArticlesListError: true,
      allArticlesListErrorMessage: message
    };

    expect(homeReducer({}, triggeringAction)).to.be.eql(expectedState);
  });

  it('returns correct state for HOME_CLICKED_LIST_UPDATE action', () => {
    const links = ['/test1', '/test2'];
    const triggeringAction = { type: constants.HOME_CLICKED_LIST_UPDATE, payload: { links } };
    const expectedState = {
      clickedLinks: links
    };

    expect(homeReducer({}, triggeringAction)).to.be.eql(expectedState);
  });
});
