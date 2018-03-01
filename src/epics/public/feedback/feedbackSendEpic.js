import * as constants from '../../../constants';
import { apiUrl, getDefaultHeaders } from '../../../config';
import { Observable } from 'rxjs/Observable';
import { submitFeedbackQuery } from '../../../graphql/queries/feedback';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/takeUntil';

export const feedbackSendEpic = (action$, { getState }, { ajax }) => {
  return action$.ofType(constants.FEEDBACK_SEND)
    .mergeMap((action) => {
      const { email, feedback } = action.payload;
      const url = `${apiUrl}/public/graphql`;
      const body = submitFeedbackQuery(email, feedback);
      return ajax({ url, body, headers: getDefaultHeaders(), method: 'POST' })
        .map(responseData => {
          const { errors } = responseData.response;
          if (errors && errors.length > 0) {
            return {
              type: constants.FEEDBACK_SEND_ERROR,
              payload: { message: errors[0].message }
            };
          }

          return { type: constants.FEEDBACK_SEND_SUCCESS };
        })
        .takeUntil(action$.ofType(constants.GLOBALS_ROUTE_CHANGED))
        .catch(error => Observable.of({
          type: constants.FEEDBACK_SEND_ERROR,
          payload: { message: error }
        }));
    });
};
