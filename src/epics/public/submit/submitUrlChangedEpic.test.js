import validators from '../../../core/helpers/validators';
import * as constants from '../../../constants';
import { ActionsObservable } from 'redux-observable';
import { expect } from 'chai';
import { submitUrlChangedEpic } from './submitUrlChangedEpic';

describe('submitUrlChangedEpic', () => {
  const newUrl = 'test@test.pl';
  const triggeringPayload = { newUrl };
  const triggeringAction = { type: constants.SUBMIT_URL_CHANGED, payload: triggeringPayload };

  const expectedPayload = {
    newUrl,
    isUrlValid: validators.isRequired(newUrl) && validators.isUrlValid(newUrl)
  };
  const expectedAction = { type: constants.SUBMIT_URL_CHANGED_VALID, payload: expectedPayload };

  const action$ = ActionsObservable.of(triggeringAction);

  it('returns action with validation', () => {
    return submitUrlChangedEpic(action$, {})
      .toPromise()
      .then(outputAction => {
        expect(outputAction).to.be.eql(expectedAction);
      });
  });
});
