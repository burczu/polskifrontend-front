/* eslint-disable */
import { expect } from 'chai';
import sinon from 'sinon';
import * as constants from '../../../constants';
import { homeBlogListGetEpic } from './homeBlogListGetEpic';
import { Observable } from 'rxjs/Observable';
import { ActionsObservable } from 'redux-observable';
import settingsHelper from '../../../core/helpers/settingsHelper';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';

describe('homeArticlesListGetEpic', () => {
  const mockState = {
    getState: () => ({
      publicState: {
        homeState: {
          blogList: []
        }
      }
    })
  };
  const page = 1;

  const triggeringPayload = { page };
  const triggeringAction = { type: constants.HOME_BLOG_LIST_GET, payload: triggeringPayload };

  const action$ = ActionsObservable.of(triggeringAction);

  describe('if everything ok', () => {
    const mockResponse = { response: { data: { blogs: { blogs: [{ test: 'test' }], nextPage: 2 } } } };
    const ajax = { post: () => Observable.of(mockResponse) };

    const expectedPayload = {
      blogs: [{ test: 'test' }],
      nextPage: 2
    };
    const expectedAction = {
      type: constants.HOME_BLOG_LIST_GET_SUCCESS,
      payload: expectedPayload
    };

    let getSettingsStub;
    let setSettingsSpy;
    beforeEach(() => {
      getSettingsStub = sinon.stub(settingsHelper, 'getSettings');
      getSettingsStub.returns({});
      setSettingsSpy = sinon.spy(settingsHelper, 'saveSettings');
    });
    afterEach(() => {
      getSettingsStub.restore();
      setSettingsSpy.restore();
    });

    it('returns a success action', () => {
      return homeBlogListGetEpic(action$, mockState, { ajax })
        .toPromise()
        .then(outputAction => {
          expect(outputAction).to.be.eql(expectedAction);
        })
    });

    it('changes the tiles setting', () => {
      return homeBlogListGetEpic(action$, mockState, { ajax })
        .toPromise()
        .then(() => {
          expect(getSettingsStub).to.be.calledOnce;
          expect(setSettingsSpy.withArgs({ tiles: true })).to.be.calledOnce;
        });
    });
  });

  describe('if errors has thrown', () => {
    const message = 'error';
    const ajax = { post: () => Observable.throw({ message }) };

    const expectedAction = { type: constants.HOME_BLOG_LIST_GET_ERROR, payload: { message } };

    it('returns an error action', () => {
      return homeBlogListGetEpic(action$, mockState, { ajax })
        .toPromise()
        .then(outputAction => {
          expect(outputAction).to.be.eql(expectedAction);
        })
    });
  });
});
