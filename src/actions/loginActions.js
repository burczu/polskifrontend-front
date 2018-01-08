import * as constants from '../constants';

export function loginUserChange(newValue) {
  return {
    type: constants.LOGIN_USER_CHANGED,
    payload: {
      newValue
    }
  };
}

export function loginPasswordChange(newValue) {
  return {
    type: constants.LOGIN_PASSWORD_CHANGED,
    payload: {
      newValue
    }
  };
}

export function loginInvoke(user, password) {
  return {
    type: constants.LOGIN_INVOKE,
    payload: {
      user,
      password
    }
  };
}
