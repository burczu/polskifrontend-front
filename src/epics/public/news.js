import * as constants from '../../constants';
import { ajax } from 'rxjs/observable/dom/ajax';
import { apiUrl, getDefaultHeaders } from '../../config';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/takeUntil';
import { getAllNewsesQuery } from '../../graphql/queries/news';

export const getNewsPageEpic = (action$, { getState }) => {
  return action$.ofType(constants.NEWS_PAGE_GET)
    .mergeMap((action) => {
      const { page } = action.payload;
      return ajax.post(`${apiUrl}/public/graphql`, getAllNewsesQuery(page), getDefaultHeaders())
        .map((responseData) => {
          const { errors } = responseData.response;
          if (errors && errors.length > 0) {
            return {
              type: constants.NEWS_PAGE_GET_ERROR,
              payload: {
                message: errors[0].message
              }
            };
          }

          const { newses, nextPage } = responseData.response.data.newses;

          const state = getState().publicState.newsState;
          const newsList = state.newsList;
          newsList.push(...newses);

          return {
            type: constants.NEWS_PAGE_GET_SUCCESS,
            payload: {
              newsList,
              nextPage
            }
          };
        })
        .takeUntil(action$.ofType(constants.GLOBALS_ROUTE_CHANGED))
        .catch(error => ({
          type: constants.NEWS_PAGE_GET_ERROR,
          payload: {
            message: error
          }
        }));
    });
};
