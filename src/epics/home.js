import * as constants from '../constants';
import { ajax } from 'rxjs/observable/dom/ajax';
import { apiUrl, getDefaultHeaders } from '../config';
import { getBlogsQuery } from '../graphql/queries/blogs';
import _ from 'lodash';
import * as settingsHelper from '../core/helpers/settingsHelper';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { getArticlesQuery } from '../graphql/queries/articles';

export const getBlogListEpic = (action$, { getState }) => {
  return action$.ofType(constants.HOME_GET_BLOG_LIST)
    .mergeMap((action) => {
      const { page } = action.payload;
      const state = getState().homeState;

      return Observable.of({ // eslint-disable-line no-undef
        type: constants.HOME_GET_BLOG_LIST_REQUEST,
        payload: {
          page,
          blogList: page === 1 ? [] : state.blogList
        }
      });
    });
};

export const getBlogListRequestEpic = (action$, { getState }) => {
  return action$.ofType(constants.HOME_GET_BLOG_LIST_REQUEST)
    .mergeMap((action) => {
      const { page } = action.payload;
      return ajax.post(`${apiUrl}/blogs/graphql`, getBlogsQuery(page), getDefaultHeaders())
        .map(responseData => {
          const { blogs, nextPage, errors } = responseData.response.data.blogs;

          if (errors && errors.length > 0) {
            return {
              type: constants.HOME_GET_BLOG_LIST_ERROR,
              payload: {
                message: errors[0].message
              }
            };
          }

          const state = getState().homeState;
          const newBlogList = _.cloneDeep(state.blogList);
          newBlogList.push(...blogs);

          // store this setting in cookie
          const tilesSettings = settingsHelper.getSettings();
          tilesSettings.tiles = true;
          settingsHelper.saveSettings(tilesSettings);

          return {
            type: constants.HOME_GET_BLOG_LIST_SUCCESS,
            payload: {
              blogs: newBlogList,
              nextPage
            }
          };
        })
        .catch(error => ({
          type: constants.HOME_GET_BLOG_LIST_ERROR,
          payload: {
            error
          }
        }));
    });
};

export const switchToListViewEpic = (action$, { getState }) => {
  return action$.ofType(constants.HOME_SWITCH_TO_LIST_VIEW)
    .mergeMap((action) => {
      const { page } = action.payload;
      const state = getState().homeState;

      return Observable.of({ // eslint-disable-line no-undef
        type: constants.HOME_SWITCH_TO_LIST_VIEW_REQUEST,
        payload: {
          page,
          articlesList: page === 1 ? [] : state.allArticlesList
        }
      });
    });
};

export const switchToListViewRequestEpic = (action$, { getState }) => {
  return action$.ofType(constants.HOME_SWITCH_TO_LIST_VIEW_REQUEST)
    .mergeMap((action) => {
      const { page } = action.payload;
      return ajax.post(`${apiUrl}/articles/graphql`, getArticlesQuery(page), getDefaultHeaders())
        .map(responseData => {
          const { articles, nextPage, errors } = responseData.response.data.articles;

          if (errors && errors.length > 0) {
            return {
              type: constants.HOME_SWITCH_TO_LIST_VIEW_ERROR,
              payload: {
                message: errors[0].message
              }
            };
          }

          const state = getState().homeState;
          const newArticlesList = _.cloneDeep(state.allArticlesList);
          newArticlesList.push(...articles);

          // store this setting in cookie
          const listSettings = settingsHelper.getSettings();
          listSettings.tiles = false;
          settingsHelper.saveSettings(listSettings);

          return {
            type: constants.HOME_SWITCH_TO_LIST_VIEW_SUCCESS,
            payload: {
              articles: newArticlesList,
              nextPage
            }
          };
        })
        .catch(error => ({
          type: constants.HOME_SWITCH_TO_LIST_VIEW_ERROR,
          payload: {
            error
          }
        }));
    });
};

export const addLinkToClickedEpic = (action$, { getState }) => {
  return action$.ofType(constants.HOME_ADD_LINK_TO_CLICKED)
    .mergeMap((action) => {
      const state = getState().homeState;
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
