import * as constants from '../constants';

export function submitUrlChanged(value) {
  return {
    type: constants.SUBMIT_URL_CHANGED,
    payload: {
      newUrl: value
    }
  };
}

export function submitEmailChanged(value) {
  return {
    type: constants.SUBMIT_EMAIL_CHANGED,
    payload: {
      newEmail: value
    }
  };
}

export function submitCaptchaChanged(value) {
  return {
    type: constants.SUBMIT_CAPTCHA_CHANGED,
    payload: {
      captcha: value
    }
  };
}

export function submitBlogRequestSend(blogName, email) {
  return {
    type: constants.SUBMIT_BLOG_REQUEST_SEND,
    payload: {
      blogName,
      email
    }
  };
}

export function submitStateReset() {
  return {
    type: constants.SUBMIT_STATE_RESET
  };
}
