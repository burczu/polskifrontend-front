import * as constants from '../../../constants';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';

export const homeBlogListGetRequestEpic = (action$, { getState }) => {
  return action$.ofType(constants.HOME_BLOG_LIST_GET_REQUEST)
    .mergeMap((action) => {
      const { page } = action.payload;
      const state = getState().publicState.homeState;

      return Observable.of({
        type: constants.HOME_BLOG_LIST_GET,
        payload: { page, blogList: page === 1 ? [] : state.blogList }
      });
    });
};
