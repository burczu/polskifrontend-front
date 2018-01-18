/* eslint-disable */
import { expect } from 'chai';
import * as actions from './submitActions';
import * as constants from '../../constants';

describe('submitActions', () => {
  it('creates an action to change url', () => {
    const newUrl = '/test';
    const expectedAction = {
      type: constants.SUBMIT_URL_CHANGED,
      payload: {
        newUrl
      }
    };

    expect(actions.submitUrlChanged(newUrl)).to.be.eql(expectedAction);
  });

  it('creates an action to change email', () => {
    const newEmail = 'test@test.pl';
    const expectedActiom = {
      type: constants.SUBMIT_EMAIL_CHANGED,
      payload: {
        newEmail
      }
    };

    expect(actions.submitEmailChanged(newEmail)).to.be.eql(expectedActiom);
  });

  it('creates an action to change captcha', () => {
    const captcha = true;
    const expectedAction = {
      type: constants.SUBMIT_CAPTCHA_CHANGED,
      payload: {
        captcha
      }
    };

    expect(actions.submitCaptchaChanged(captcha)).to.be.eql(expectedAction);
  });

  it('creates an action send blog request', () => {
    const blogName = 'nafrontendzie.pl';
    const email = 'test@test.pl';
    const expectedAction = {
      type: constants.SUBMIT_BLOG_REQUEST_SEND,
      payload: {
        blogName,
        email
      }
    };

    expect(actions.submitBlogRequestSend(blogName, email)).to.be.eql(expectedAction);
  });

  it('creates an action to reset the state', () => {
    const expectedAction = {
      type: constants.SUBMIT_STATE_RESET
    };

    expect(actions.submitStateReset()).to.be.eql(expectedAction);
  });
});
