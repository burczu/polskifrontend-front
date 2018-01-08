import * as constants from '../../constants';
import { ajax } from 'rxjs/observable/dom/ajax';
import * as loginHelper from '../../core/helpers/loginHelper';
import { apiUrl, getDefaultHeaders } from '../../config';
import sha1 from 'sha1';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/takeUntil';
import { authenticateQuery } from '../../graphql/queries/login';

export const userChangeEpic = (action$, { getState }) => {
  return action$.ofType(constants.LOGIN_USER_CHANGED)
    .mergeMap((action) => {
      const { newValue } = action.payload;
      const state = getState().publicState.loginState;
      const formFilled = newValue !== '' && state.password !== '';

      return Observable.of({ // eslint-disable-line no-undef
        type: constants.LOGIN_USER_CHANGED_VALID,
        payload: {
          newValue,
          formFilled
        }
      });
    });
};

export const passwordChangeEpic = (action$, { getState }) => {
  return action$.ofType(constants.LOGIN_PASSWORD_CHANGED)
    .mergeMap((action) => {
      const { newValue } = action.payload;
      const state = getState().publicState.loginState;
      const formFilled = state.userName !== '' && newValue !== '';

      return Observable.of({ // eslint-disable-line no-undef
        type: constants.LOGIN_PASSWORD_CHANGED_VALID,
        payload: {
          password: sha1(newValue),
          formFilled
        }
      });
    });
};

export const loginEpic = (action$) => {
  return action$.ofType(constants.LOGIN_INVOKE)
    .mergeMap((action) => {
      const { user, password } = action.payload;
      return ajax({
        url: `${apiUrl}/public/graphql`,
        body: authenticateQuery(user, password),
        headers: getDefaultHeaders(),
        method: 'POST'
      }).map((responseData) => {
        const { errors } = responseData.response;
        if (errors && errors.length > 0) {
          return {
            type: constants.LOGIN_INVOKE_ERROR,
            payload: {
              message: errors[0].message
            }
          };
        }

        const { success, token } = responseData.response.data.userAuthenticate;
        if (success) {
          // set cookie for later use
          loginHelper.saveLoginToken(token);

          return {
            type: constants.LOGIN_INVOKE_SUCCESS
          };
        }

        return {
          type: constants.LOGIN_INVOKE_ERROR,
          payload: {
            message: 'Login failed'
          }
        };
      })
      .takeUntil(action$.ofType(constants.GLOBALS_ROUTE_CHANGED))
      .catch(error => ({
        type: constants.LOGIN_INVOKE_ERROR,
        payload: {
          message: error
        }
      }));
    });
};
