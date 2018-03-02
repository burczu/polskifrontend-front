import validators from '../../../core/helpers/validators';
import * as constants from '../../../constants';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';

export const submitEmailChangedEpic = action$ => {
  return action$.ofType(constants.SUBMIT_EMAIL_CHANGED)
    .mergeMap((action) => {
      const { newEmail } = action.payload;
      const isEmailValid = newEmail === '' || validators.isEmailValid(newEmail);

      return Observable.of({
        type: constants.SUBMIT_EMAIL_CHANGED_VALID,
        payload: { newEmail, isEmailValid }
      });
    });
};
