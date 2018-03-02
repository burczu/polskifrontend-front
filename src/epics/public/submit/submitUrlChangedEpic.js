import validators from '../../../core/helpers/validators';
import * as constants from '../../../constants';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';

export const submitUrlChangedEpic = action$ => {
  return action$.ofType(constants.SUBMIT_URL_CHANGED)
    .mergeMap((action) => {
      const { newUrl } = action.payload;
      const isUrlValid = validators.isRequired(newUrl) && validators.isUrlValid(newUrl);

      return Observable.of({
        type: constants.SUBMIT_URL_CHANGED_VALID,
        payload: { newUrl, isUrlValid }
      });
    });
};
