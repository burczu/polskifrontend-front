import validators from '../../../core/helpers/validators';
import * as constants from '../../../constants';
import { ActionsObservable } from 'redux-observable';
import { expect } from 'chai';
import { feedbackTextChangedEpic } from './feedbackTextChangedEpic';

describe('feedbackTextChangedEpic', () => {
  const value = 'test';
  const triggeringPayload = { value };
  const triggeringAction = { type: constants.FEEDBACK_TEXT_CHANGED, payload: triggeringPayload };

  const expectedPayload = { value, isValid: validators.isRequired(value) };
  const expectedAction = { type: constants.FEEDBACK_TEXT_CHANGED_VALID, payload: expectedPayload };

  const action$ = ActionsObservable.of(triggeringAction);

  it('returns action with validation', () => {
    return feedbackTextChangedEpic(action$, {})
      .toPromise()
      .then(outputAction => {
        expect(outputAction).to.be.eql(expectedAction);
      });
  });
});
