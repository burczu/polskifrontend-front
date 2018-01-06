import * as constants from '../constants';
import * as validators from '../core/helpers/validators';
import { ajax } from 'rxjs/observable/dom/ajax';
import { apiUrl, getDefaultHeaders } from '../config';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { submitFeedbackQuery } from '../graphql/queries/feedback';

export const feedbackTextChangedEpic = (action$) => {
  return action$.ofType(constants.FEEDBACK_TEXT_CHANGED)
    .mergeMap((action) => {
      const { value } = action.payload;
      const isValid = validators.isRequired(value);

      return Observable.of({ // eslint-disable-line no-undef
        type: constants.FEEDBACK_TEXT_CHANGED_VALID,
        payload: {
          value,
          isValid
        }
      });
    });
};

export const feedbackEmailChangedEpic = (action$) => {
  return action$.ofType(constants.FEEDBACK_EMAIL_CHANGED)
    .mergeMap((action) => {
      const { value } = action.payload;
      const isValid = value === '' || validators.isEmailValid(value);

      return Observable.of({ // eslint-disable-line no-undef
        type: constants.FEEDBACK_EMAIL_CHANGED_VALID,
        payload: {
          value,
          isValid
        }
      });
    });
};

export const sendFeedbackEpic = (action$) => {
  return action$.ofType(constants.FEEDBACK_SEND)
    .mergeMap((action) => {
      const { email, feedback } = action.payload;
      return ajax({
        url: `${apiUrl}/feedback/graphql`,
        body: submitFeedbackQuery(email, feedback),
        headers: getDefaultHeaders(),
        method: 'POST'
      }).map(responseData => {
        const { errors } = responseData.response;
        if (errors && errors.length > 0) {
          return {
            type: constants.FEEDBACK_SEND_ERROR,
            payload: {
              message: errors[0].message
            }
          };
        }

        return {
          type: constants.FEEDBACK_SEND_SUCCESS
        };
      })
      .catch(error => ({
        type: constants.FEEDBACK_SEND_ERROR,
        payload: {
          message: error
        }
      }));
    });
};
