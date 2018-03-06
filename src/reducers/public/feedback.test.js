/* eslint-disable */
import { expect } from 'chai';
import * as constants from '../../constants';
import feedbackReducer, { initialState } from './feedback';

describe('feedbackReducer', () => {
  it('returns initial state for no matching action', () => {
    expect(feedbackReducer(undefined, {})).to.be.eql(initialState);
  });

  it('returns correct state for FEEDBACK_TEXT_CHANGED_VALID action', () => {
    const value = 'test';
    const isValid = true;
    const triggeringAction = {
      type: constants.FEEDBACK_TEXT_CHANGED_VALID,
      payload: { value, isValid }
    };
    const currentState = { ...initialState };
    const expectedState = {
      ...initialState,
      feedback: value,
      feedbackDirty: true,
      feedbackValid: isValid,
      shouldCleanUp: false
    };

    expect(feedbackReducer(currentState, triggeringAction)).to.be.eql(expectedState);
  });

  it('returns correct state for FEEDBACK_EMAIL_CHANGED_VALID action', () => {
    const value = 'test';
    const isValid = true;
    const triggeringAction = {
      type: constants.FEEDBACK_EMAIL_CHANGED_VALID,
      payload: { value, isValid }
    };
    const currentState = { ...initialState };
    const expectedState = {
      ...initialState,
      email: value,
      emailDirty: true,
      emailValid: isValid,
      shouldCleanUp: false
    };

    expect(feedbackReducer(currentState, triggeringAction)).to.be.eql(expectedState);
  });

  it('returns correct state for FEEDBACK_CAPTCHA_CHANGED action', () => {
    const value = true;
    const triggeringAction = { type: constants.FEEDBACK_CAPTCHA_CHANGED, payload: { value } };
    const currentState = { ...initialState };
    const expectedState = {
      ...initialState,
      captcha: value,
      shouldCleanUp: false
    };

    expect(feedbackReducer(currentState, triggeringAction)).to.be.eql(expectedState);
  });

  it('returns correct state for FEEDBACK_SEND action', () => {
    const triggeringAction = { type: constants.FEEDBACK_SEND };
    const currentState = { ...initialState };
    const expectedState = {
      ...initialState,
      sending: true,
      sendError: false,
      shouldCleanUp: false
    };

    expect(feedbackReducer(currentState, triggeringAction)).to.be.eql(expectedState);
  });

  it('returns correct state for FEEDBACK_SEND_SUCCESS action', () => {
    const triggeringAction = { type: constants.FEEDBACK_SEND_SUCCESS };
    const currentState = { ...initialState };
    const expectedState = {
      ...initialState,
      sending: false,
      sendError: false,
      sent: true,
      shouldCleanUp: false
    };

    expect(feedbackReducer(currentState, triggeringAction)).to.be.eql(expectedState);
  });

  it('returns correct state for FEEDBACK_SEND_ERROR action', () => {
    const message = 'test';
    const triggeringAction = { type: constants.FEEDBACK_SEND_ERROR, payload: { message } };
    const currentState = { ...initialState };
    const expectedState = {
      ...initialState,
      sent: false,
      sending: false,
      sendError: true,
      sendErrorMessage: message,
      shouldCleanUp: false
    };

    expect(feedbackReducer(currentState, triggeringAction)).to.be.eql(expectedState);
  });

  it('returns correct state for FEEDBACK_STATE_RESET action', () => {
    const triggeringAction = { type: constants.FEEDBACK_STATE_RESET };
    const currentState = { ...initialState };
    const expectedState = { ...initialState, shouldCleanUp: true };

    expect(feedbackReducer(currentState, triggeringAction)).to.be.eql(expectedState);
  });
});
