/* eslint-disable */
import { expect } from 'chai';
import * as actions from './loginActions';
import * as constants from '../../constants';

describe('loginActions', () => {
  it('creates an action to change user', () => {
    const newValue = 'test';
    const expectedAction = {
      type: constants.LOGIN_USER_CHANGED,
      payload: {
        newValue
      }
    };

    expect(actions.loginUserChange(newValue)).to.be.eql(expectedAction);
  });

  it('creates an action to change password', () => {
    const newValue = 'fgdsgsfg';
    const expectedAction = {
      type: constants.LOGIN_PASSWORD_CHANGED,
      payload: {
        newValue
      }
    };

    expect(actions.loginPasswordChange(newValue)).to.be.eql(expectedAction);
  });

  it('creates an action to perform login', () => {
    const user = 'test';
    const password = 'gsdgsdf';
    const expectedAction = {
      type: constants.LOGIN_INVOKE,
      payload: {
        user,
        password
      }
    };

    expect(actions.loginInvoke(user, password)).to.be.eql(expectedAction);
  });
});
