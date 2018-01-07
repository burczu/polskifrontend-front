import * as constants from '../constants';
import { ajax } from 'rxjs/observable/dom/ajax';
import { apiUrl, getDefaultHeaders } from '../config';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { getAllNewsesQuery } from '../graphql/queries/news';

export const getNewsPageEpic = (action$, store) => {
  return action$.ofType(constants.NEWS_GET_NEWS_PAGE)
    .mergeMap((action) => {
      const { page } = action.payload;
      return ajax.post(`${apiUrl}/public/graphql`, getAllNewsesQuery(page), getDefaultHeaders())
        .map((responseData) => {
          const { errors } = responseData.response;
          if (errors && errors.length > 0) {
            return {
              type: constants.NEWS_GET_NEWS_PAGE_ERROR,
              payload: {
                message: errors[0].message
              }
            };
          }

          const { newses, nextPage } = responseData.response.data.newses;

          const state = store.getState().newsState;
          const newsList = state.newsList;
          newsList.push(...newses);

          return {
            type: constants.NEWS_GET_NEWS_PAGE_SUCCESS,
            payload: {
              newsList,
              nextPage
            }
          };
        })
        .catch(error => ({
          type: constants.NEWS_GET_NEWS_PAGE_ERROR,
          payload: {
            message: error
          }
        }));
    });
};
