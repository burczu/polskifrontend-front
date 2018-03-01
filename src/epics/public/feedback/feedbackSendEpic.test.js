/* eslint-disable */
import { expect } from 'chai';
import * as constants from '../../../constants';
import { feedbackSendEpic } from './feedbackSendEpic';
import { Observable } from 'rxjs/Observable';
import { ActionsObservable } from 'redux-observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';

describe('feedbackSendEpic', () => {
  const email = 'test@test.com';
  const feedback = 'some test feedback';

  const triggeringPayload = { email, feedback };
  const triggeringAction = { type: constants.FEEDBACK_SEND, payload: triggeringPayload };

  const action$ = ActionsObservable.of(triggeringAction);

  describe('if everything ok', () => {
    const ajax = () => Observable.of({});

    const expectedAction = { type: constants.FEEDBACK_SEND_SUCCESS };

    it('returns a success action', () => {
      return feedbackSendEpic(action$, {}, { ajax })
        .toPromise()
        .then(outputAction => {
          expect(outputAction).to.be.eql(expectedAction);
        })
    });
  });

  describe('if errors has thrown', () => {
    const message = 'error';
    const ajax = () => Observable.throw({ message });

    const expectedAction = { type: constants.FEEDBACK_SEND_ERROR, payload: { message } };

    it('returns an error action', () => {
      return feedbackSendEpic(action$, {}, { ajax })
        .toPromise()
        .then(outputAction => {
          expect(outputAction).to.be.eql(expectedAction);
        })
    });
  });
});
