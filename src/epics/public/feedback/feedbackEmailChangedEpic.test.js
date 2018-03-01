import validators from '../../../core/helpers/validators';
import * as constants from '../../../constants';
import { ActionsObservable } from 'redux-observable';
import { expect } from 'chai';
import { feedbackEmailChangedEpic } from './feedbackEmailChangedEpic';

describe('feedbackEmailChangeEpic', () => {
  const value = 'test@test.com';
  const triggeringPayload = { value };
  const triggeringAction = { type: constants.FEEDBACK_EMAIL_CHANGED, payload: triggeringPayload };

  const expectedPayload = { value, isValid: value === '' || validators.isEmailValid(value) };
  const expectedAction = { type: constants.FEEDBACK_EMAIL_CHANGED_VALID, payload: expectedPayload };

  const action$ = ActionsObservable.of(triggeringAction);

  it('returns action with validation', () => {
    return feedbackEmailChangedEpic(action$, {})
      .toPromise()
      .then(outputAction => {
        expect(outputAction).to.be.eql(expectedAction);
      });
  });
});
