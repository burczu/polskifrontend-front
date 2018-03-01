import * as constants from '../../../constants';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';

export const homeArticlesListGetRequestEpic = (action$, { getState }) => {
  return action$.ofType(constants.HOME_ARTICLE_LIST_GET_REQUEST)
    .mergeMap((action) => {
      const { page } = action.payload;
      const state = getState().publicState.homeState;

      return Observable.of({ // eslint-disable-line no-undef
        type: constants.HOME_ARTICLE_LIST_GET,
        payload: {
          page,
          articlesList: page === 1 ? [] : state.allArticlesList
        }
      });
    });
};
