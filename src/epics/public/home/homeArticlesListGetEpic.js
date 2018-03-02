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

const turnOffTilesSetting = () => {
  const listSettings = settingsHelper.getSettings();
  listSettings.tiles = false;
  settingsHelper.saveSettings(listSettings);
};

const getModifiedArticlesList = (state, articles) => {
  const newArticlesList = _.cloneDeep(state.allArticlesList);
  newArticlesList.push(...articles);
  return newArticlesList;
};

export const homeArticlesListGetEpic = (action$, { getState }, { ajax }) => {
  return action$.ofType(constants.HOME_ARTICLE_LIST_GET)
    .mergeMap((action) => {
      const { page } = action.payload;
      return ajax.post(`${apiUrl}/public/graphql`, getArticlesQuery(page), getDefaultHeaders())
        .map(responseData => {
          const { articles, nextPage } = responseData.response.data.articles;
          const state = getState().publicState.homeState;
          turnOffTilesSetting();

          return {
            type: constants.HOME_ARTICLE_LIST_GET_SUCCESS,
            payload: { articles: getModifiedArticlesList(state, articles), nextPage }
          };
        })
        .takeUntil(action$.ofType(constants.GLOBALS_ROUTE_CHANGED))
        .catch(error => Observable.of({
          type: constants.HOME_ARTICLE_LIST_GET_ERROR,
          payload: { message: error.message }
        }));
    });
};
