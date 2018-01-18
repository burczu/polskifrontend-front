/* eslint-disable */
import { expect } from 'chai';
import * as actions from './feedbackActions';
import * as constants from '../../constants';

describe('feedbackActions', () => {
  it('creates an action for text change', () => {
    const value = 'new value';
    const expectedAction = {
      type: constants.FEEDBACK_TEXT_CHANGED,
      payload: {
        value
      }
    };

    expect(actions.feedbackTextChanged(value)).to.be.eql(expectedAction);
  });

  it('creates an action for email change', () => {
    const value = 'new value';
    const expectedAction = {
      type: constants.FEEDBACK_EMAIL_CHANGED,
      payload: {
        value
      }
    };

    expect(actions.feedbackEmailChanged(value)).to.be.eql(expectedAction);
  });

  it('creates an action for captcha change', () => {
    const value = true;
    const expectedAction = {
      type: constants.FEEDBACK_CAPTCHA_CHANGED,
      payload: {
        value
      }
    };

    expect(actions.feedbackCaptchaChanged(value)).to.be.eql(expectedAction);
  });

  it('creates an action for feedback send', () => {
    const email = 'test@test.pl';
    const feedback = 'test feedback';
    const expectedAction = {
      type: constants.FEEDBACK_SEND,
      payload: {
        email,
        feedback
      }
    };

    expect(actions.feedbackSend(email, feedback)).to.be.eql(expectedAction);
  });

  it('creates an action for state reset', () => {
    const expectedAction = {
      type: constants.FEEDBACK_STATE_RESET
    };

    expect(actions.feedbackStateReset()).to.be.eql(expectedAction);
  });
});
