import * as constants from '../../constants';
import * as validators from '../../core/helpers/validators';
import { ajax } from 'rxjs/observable/dom/ajax';
import { apiUrl, getDefaultHeaders } from '../../config';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/takeUntil';
import { submitBlogQuery } from '../../graphql/queries/blogs';

export const urlChangedEpic = action$ => {
  return action$.ofType(constants.SUBMIT_URL_CHANGED)
    .mergeMap((action) => {
      const { newUrl } = action.payload;
      const isUrlValid = validators.isRequired(newUrl) && validators.isUrlValid(newUrl);

      return Observable.of({ // eslint-disable-line no-undef
        type: constants.SUBMIT_URL_CHANGED_VALID,
        payload: {
          newUrl,
          isUrlValid
        }
      });
    });
};

export const emailChangedEpic = action$ => {
  return action$.ofType(constants.SUBMIT_EMAIL_CHANGED)
    .mergeMap((action) => {
      const { newEmail } = action.payload;
      const isEmailValid = newEmail === '' || validators.isEmailValid(newEmail);

      return Observable.of({ // eslint-disable-line no-undef
        type: constants.SUBMIT_EMAIL_CHANGED_VALID,
        payload: {
          newEmail,
          isEmailValid
        }
      });
    });
};

export const sendBlogRequestEpic = action$ => {
  return action$.ofType(constants.SUBMIT_BLOG_REQUEST_SEND)
    .mergeMap((action) =>
      ajax({
        url: `${apiUrl}/public/graphql`,
        body: submitBlogQuery(action.payload.blogName, action.payload.email),
        headers: getDefaultHeaders(),
        method: 'POST'
      }).map(responseData => {
        const { errors } = responseData.response;

        if (errors && errors.length > 0) {
          return {
            type: constants.SUBMIT_BLOG_REQUEST_SEND_ERROR
          };
        }

        return {
          type: constants.SUBMIT_BLOG_REQUEST_SEND_SUCCESS
        };
      })
      .takeUntil(action$.ofType(constants.GLOBALS_ROUTE_CHANGED))
      .catch(() => ({
        type: constants.SUBMIT_BLOG_REQUEST_SEND_ERROR
      }))
    );
};
