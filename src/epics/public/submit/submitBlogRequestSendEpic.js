import * as constants from '../../../constants';
import { apiUrl, getDefaultHeaders } from '../../../config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/takeUntil';
import { submitBlogQuery } from '../../../graphql/queries/blogs';

export const submitBlogRequestSendEpic = (action$, { getState }, { ajax }) => {
  return action$.ofType(constants.SUBMIT_BLOG_REQUEST_SEND)
    .mergeMap((action) => {
      const { blogName, email } = action.payload;
      const ajaxSettings = {
        url: `${apiUrl}/public/graphql`,
        body: submitBlogQuery(blogName, email),
        headers: getDefaultHeaders(),
        method: 'POST'
      };

      return ajax(ajaxSettings)
        .map(() => ({ type: constants.SUBMIT_BLOG_REQUEST_SEND_SUCCESS }))
        .takeUntil(action$.ofType(constants.GLOBALS_ROUTE_CHANGED))
        .catch(() => Observable.of({ type: constants.SUBMIT_BLOG_REQUEST_SEND_ERROR }));
    });
};
