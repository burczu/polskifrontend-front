/* eslint-disable */
import { expect } from 'chai';
import * as constants from '../../constants';
import submitReducer, { initialState } from './submit';

describe('submitReducer', () => {
  it('returns initial state for no matching action', () => {
    expect(submitReducer(undefined, {})).to.be.eql(initialState);
  });

  it('returns correct state for SUBMIT_URL_CHANGED_VALID action', () => {
    const newUrl = 'test url';
    const isUrlValid = true;
    const triggeringAction = {
      type: constants.SUBMIT_URL_CHANGED_VALID,
      payload: { newUrl, isUrlValid }
    };
    const expectedState = {
      url: newUrl,
      urlDirty: true,
      urlValid: isUrlValid,
      shouldCleanUp: false
    };

    expect(submitReducer({}, triggeringAction)).to.be.eql(expectedState);
  });

  it('returns correct state for SUBMIT_EMAIL_CHANGED_VALID action', () => {
    const newEmail = 'mock email';
    const isEmailValid = false;
    const triggeringAction = {
      type: constants.SUBMIT_EMAIL_CHANGED_VALID,
      payload: { newEmail, isEmailValid }
    };
    const expectedState = {
      email: newEmail,
      emailDirty: true,
      emailValid: isEmailValid,
      shouldCleanUp: false
    };

    expect(submitReducer({}, triggeringAction)).to.be.eql(expectedState);
  });

  it('returns correct state for SUBMIT_CAPTCHA_CHANGED action', () => {
    const captcha = true;
    const triggeringAction = {
      type: constants.SUBMIT_CAPTCHA_CHANGED,
      payload: { captcha }
    };
    const expectedState = {
      captcha, shouldCleanUp: false
    };

    expect(submitReducer({}, triggeringAction)).to.be.eql(expectedState);
  });

  it('returns correct state for SUBMIT_BLOG_REQUEST_SEND action', () => {
    const triggeringAction = {
      type: constants.SUBMIT_BLOG_REQUEST_SEND
    };
    const expectedState = {
      sending: true,
      sendError: false,
      shouldCleanUp: false
    };

    expect(submitReducer({}, triggeringAction)).to.be.eql(expectedState);
  });

  it('returns correct state for SUBMIT_BLOG_REQUEST_SEND_SUCCESS action', () => {
    const triggeringAction = {
      type: constants.SUBMIT_BLOG_REQUEST_SEND_SUCCESS
    };
    const expectedState = {
      sending: false,
      sendError: false,
      sent: true,
      shouldCleanUp: false
    };

    expect(submitReducer({}, triggeringAction)).to.be.eql(expectedState);
  });

  it('returns correct state for SUBMIT_BLOG_REQUEST_SEND_ERROR action', () => {
    const triggeringAction = {
      type: constants.SUBMIT_BLOG_REQUEST_SEND_ERROR
    };
    const expectedState = {
      sending: false,
      sendError: true,
      sent: false,
      shouldCleanUp: false
    };

    expect(submitReducer({}, triggeringAction)).to.be.eql(expectedState);
  });

  it('returns correct state for SUBMIT_STATE_RESET action', () => {
    const triggeringAction = {
      type: constants.SUBMIT_STATE_RESET
    };
    const expectedState = {
      ...initialState,
      shouldCleanUp: true
    };

    expect(submitReducer({}, triggeringAction)).to.be.eql(expectedState);
  });
});
