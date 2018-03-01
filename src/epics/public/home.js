import * as constants from '../../constants';
import { ajax } from 'rxjs/observable/dom/ajax';
import { apiUrl, getDefaultHeaders } from '../../config';
import { getBlogsQuery } from '../../graphql/queries/blogs';
import _ from 'lodash';
import settingsHelper from '../../core/helpers/settingsHelper';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/takeUntil';
import { getArticlesQuery } from '../../graphql/queries/articles';

export const getBlogListEpic = (action$, { getState }) => {
  return action$.ofType(constants.HOME_BLOG_LIST_GET)
    .mergeMap((action) => {
      const { page } = action.payload;
      const state = getState().publicState.homeState;

      return Observable.of({ // eslint-disable-line no-undef
        type: constants.HOME_BLOG_LIST_GET_REQUEST,
        payload: {
          page,
          blogList: page === 1 ? [] : state.blogList
        }
      });
    });
};

export const getBlogListRequestEpic = (action$, { getState }) => {
  return action$.ofType(constants.HOME_BLOG_LIST_GET_REQUEST)
    .mergeMap((action) => {
      const { page } = action.payload;
      return ajax.post(`${apiUrl}/public/graphql`, getBlogsQuery(page), getDefaultHeaders())
        .map(responseData => {
          const { errors } = responseData.response;

          if (errors && errors.length > 0) {
            return {
              type: constants.HOME_BLOG_LIST_GET_ERROR,
              payload: {
                message: errors[0].message
              }
            };
          }

          const { blogs, nextPage } = responseData.response.data.blogs;

          const state = getState().publicState.homeState;
          const newBlogList = _.cloneDeep(state.blogList);
          newBlogList.push(...blogs);

          // store this setting in cookie
          const tilesSettings = settingsHelper.getSettings();
          tilesSettings.tiles = true;
          settingsHelper.saveSettings(tilesSettings);

          return {
            type: constants.HOME_BLOG_LIST_GET_SUCCESS,
            payload: {
              blogs: newBlogList,
              nextPage
            }
          };
        })
        .takeUntil(action$.ofType(constants.GLOBALS_ROUTE_CHANGED))
        .catch(error => ({
          type: constants.HOME_BLOG_LIST_GET_ERROR,
          payload: {
            error
          }
        }));
    });
};

export const switchToListViewEpic = (action$, { getState }) => {
  return action$.ofType(constants.HOME_ARTICLE_LIST_GET)
    .mergeMap((action) => {
      const { page } = action.payload;
      const state = getState().publicState.homeState;

      return Observable.of({ // eslint-disable-line no-undef
        type: constants.HOME_ARTICLE_LIST_GET_REQUEST,
        payload: {
          page,
          articlesList: page === 1 ? [] : state.allArticlesList
        }
      });
    });
};

export const switchToListViewRequestEpic = (action$, { getState }) => {
  return action$.ofType(constants.HOME_ARTICLE_LIST_GET_REQUEST)
    .mergeMap((action) => {
      const { page } = action.payload;
      return ajax.post(`${apiUrl}/public/graphql`, getArticlesQuery(page), getDefaultHeaders())
        .map(responseData => {
          const { errors } = responseData.response;

          if (errors && errors.length > 0) {
            return {
              type: constants.HOME_ARTICLE_LIST_GET_ERROR,
              payload: {
                message: errors[0].message
              }
            };
          }

          const { articles, nextPage } = responseData.response.data.articles;

          const state = getState().publicState.homeState;
          const newArticlesList = _.cloneDeep(state.allArticlesList);
          newArticlesList.push(...articles);

          // store this setting in cookie
          const listSettings = settingsHelper.getSettings();
          listSettings.tiles = false;
          settingsHelper.saveSettings(listSettings);

          return {
            type: constants.HOME_ARTICLE_LIST_GET_SUCCESS,
            payload: {
              articles: newArticlesList,
              nextPage
            }
          };
        })
        .takeUntil(action$.ofType(constants.GLOBALS_ROUTE_CHANGED))
        .catch(error => Observable.of({
          type: constants.HOME_ARTICLE_LIST_GET_ERROR,
          payload: {
            error
          }
        }));
    });
};

export const addLinkToClickedEpic = (action$, { getState }) => {
  return action$.ofType(constants.HOME_ADD_LINK_TO_CLICKED)
    .mergeMap((action) => {
      const state = getState().publicState.homeState;
      const links = _.cloneDeep(state.clickedLinks);
      const { url } = action.payload;

      links.push(url);

      return Observable.of({ // eslint-disable-line no-undef
        type: constants.HOME_UPDATE_CLICKED_LIST,
        payload: {
          links
        }
      });
    });
};
