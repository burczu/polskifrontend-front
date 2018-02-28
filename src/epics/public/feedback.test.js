/* eslint-disable */
import { expect } from 'chai';
import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import {
  feedbackEmailChangedEpic,
  feedbackTextChangedEpic,
  feedbackSendEpic
} from './feedback';
import * as constants from '../../constants';
import validators from '../../core/helpers/validators';

import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/toPromise';

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
