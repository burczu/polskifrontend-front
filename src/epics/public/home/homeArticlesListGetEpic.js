import { getArticlesQuery } from '../../../graphql/queries/articles';
import { apiUrl, getDefaultHeaders } from '../../../config';
import * as constants from '../../../constants';
import settingsHelper from '../../../core/helpers/settingsHelper';
import { Observable } from 'rxjs/Observable';
import _ from 'lodash';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/takeUntil';

export const homeArticlesListGetEpic = (action$, { getState }, { ajax }) => {
  return action$.ofType(constants.HOME_ARTICLE_LIST_GET)
    .mergeMap((action) => {
      const { page } = action.payload;
      return ajax.post(`${apiUrl}/public/graphql`, getArticlesQuery(page), getDefaultHeaders())
        .map(responseData => {
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
