import * as constants from '../../../constants';
import { apiUrl, getDefaultHeaders } from '../../../config';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/takeUntil';
import { getAllNewsesQuery } from '../../../graphql/queries/news';

const getModifiedNewsList = (state, newses) => {
  const newsList = state.newsList;
  newsList.push(...newses);
  return newsList;
};

export const newsPageGetEpic = (action$, { getState }, { ajax }) => {
  return action$.ofType(constants.NEWS_PAGE_GET)
    .mergeMap((action) => {
      const { page } = action.payload;
      return ajax.post(`${apiUrl}/public/graphql`, getAllNewsesQuery(page), getDefaultHeaders())
        .map((responseData) => {
          const { newses, nextPage } = responseData.response.data.newses;
          const state = getState().publicState.newsState;

          return {
            type: constants.NEWS_PAGE_GET_SUCCESS,
            payload: { newsList: getModifiedNewsList(state, newses), nextPage }
          };
        })
        .takeUntil(action$.ofType(constants.GLOBALS_ROUTE_CHANGED))
        .catch(error => ({
          type: constants.NEWS_PAGE_GET_ERROR,
          payload: { message: error.message }
        }));
    });
};
