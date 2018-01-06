import * as constants from '../constants';
import { ajax } from 'rxjs/observable/dom/ajax';
import { apiUrl, getDefaultHeaders } from '../config';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { getArticleBySlugQuery } from '../graphql/queries/articles';

export const articlesGetArticleEpic = (action$) => {
  return action$.ofType(constants.ARTICLES_GET_ARTICLE)
    .mergeMap((action) => {
      const { slug } = action.payload;
      return ajax.post(`${apiUrl}/articles/graphql`, getArticleBySlugQuery(slug), getDefaultHeaders())
        .map(responseData => {
          const { errors } = responseData.response;
          if (errors && errors.length > 0) {
            return {
              type: constants.ARTICLES_GET_ARTICLE_ERROR,
              payload: {
                message: errors[0].message
              }
            };
          }

          return {
            type: constants.ARTICLES_GET_ARTICLE_SUCCESS,
            payload: {
              article: responseData.response.data.articleBySlug
            }
          };
        })
        .catch(error => ({
          type: constants.ARTICLES_GET_ARTICLE_ERROR,
          payload: {
            message: error
          }
        }));
    });
};
