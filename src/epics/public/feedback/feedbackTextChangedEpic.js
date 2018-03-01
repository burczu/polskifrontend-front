import * as constants from '../../../constants';
import validators from '../../../core/helpers/validators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';

export const feedbackTextChangedEpic = (action$) => {
  return action$.ofType(constants.FEEDBACK_TEXT_CHANGED)
    .mergeMap((action) => {
      const { value } = action.payload;
      const isValid = validators.isRequired(value);

      return Observable.of({ // eslint-disable-line no-undef
        type: constants.FEEDBACK_TEXT_CHANGED_VALID,
        payload: { value, isValid }
      });
    });
};
