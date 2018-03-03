import validators from '../../../core/helpers/validators';
import * as constants from '../../../constants';
import { ActionsObservable } from 'redux-observable';
import { expect } from 'chai';
import { submitEmailChangedEpic } from './submitEmailChangedEpic';

describe('submitEmailChangedEpic', () => {
  const newEmail = 'test@test.pl';
  const triggeringPayload = { newEmail };
  const triggeringAction = { type: constants.SUBMIT_EMAIL_CHANGED, payload: triggeringPayload };

  const expectedPayload = { newEmail, isEmailValid: validators.isEmailValid(newEmail) };
  const expectedAction = { type: constants.SUBMIT_EMAIL_CHANGED_VALID, payload: expectedPayload };

  const action$ = ActionsObservable.of(triggeringAction);

  it('returns action with validation', () => {
    return submitEmailChangedEpic(action$, {})
      .toPromise()
      .then(outputAction => {
        expect(outputAction).to.be.eql(expectedAction);
      });
  });
});
