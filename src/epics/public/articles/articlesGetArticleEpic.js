import * as constants from '../../../constants';
import { apiUrl, getDefaultHeaders } from '../../../config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/takeUntil';
import { getArticleBySlugQuery } from '../../../graphql/queries/articles';

export const articlesGetArticleEpic = (action$, store, { ajax }) => {
  return action$.ofType(constants.ARTICLES_ARTICLE_GET)
    .mergeMap((action) => {
      const { slug } = action.payload;
      const url = `${apiUrl}/public/graphql`;
      const body = getArticleBySlugQuery(slug);
      const headers = getDefaultHeaders();

      return ajax({ url, method: 'POST', body, headers })
        .map(responseData => ({
          type: constants.ARTICLES_ARTICLE_GET_SUCCESS,
          payload: { article: responseData.response.data.articleBySlug }
        }))
        .takeUntil(action$.ofType(constants.GLOBALS_ROUTE_CHANGED))
        .catch(error => Observable.of({
          type: constants.ARTICLES_ARTICLE_GET_ERROR,
          payload: { message: error }
        }));
    });
};
