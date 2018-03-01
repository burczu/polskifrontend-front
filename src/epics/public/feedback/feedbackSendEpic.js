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
      const ajaxSettings = {
        url: `${apiUrl}/public/graphql`,
        body: submitFeedbackQuery(email, feedback),
        method: 'POST',
        headers: getDefaultHeaders()
      };

      return ajax(ajaxSettings)
        .map(() => ({ type: constants.FEEDBACK_SEND_SUCCESS }))
        .takeUntil(action$.ofType(constants.GLOBALS_ROUTE_CHANGED))
        .catch(error => Observable.of({
          type: constants.FEEDBACK_SEND_ERROR,
          payload: { message: error.message }
        }));
    });
};
