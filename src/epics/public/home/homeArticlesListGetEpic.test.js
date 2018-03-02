/* eslint-disable */
import { expect } from 'chai';
import sinon from 'sinon';
import * as constants from '../../../constants';
import { homeArticlesListGetEpic } from './homeArticlesListGetEpic';
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
          allArticlesList: []
        }
      }
    })
  };
  const page = 1;

  const triggeringPayload = { page };
  const triggeringAction = { type: constants.HOME_ARTICLE_LIST_GET, payload: triggeringPayload };

  const action$ = ActionsObservable.of(triggeringAction);

  describe('if everything ok', () => {
    const mockResponse = { response: { data: { articles: { articles: [{ test: 'test' }], nextPage: 2 } } } };
    const ajax = { post: () => Observable.of(mockResponse) };

    const expectedPayload = {
      articles: [{ test: 'test' }],
      nextPage: 2
    };
    const expectedAction = {
      type: constants.HOME_ARTICLE_LIST_GET_SUCCESS,
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
      return homeArticlesListGetEpic(action$, mockState, { ajax })
        .toPromise()
        .then(outputAction => {
          expect(outputAction).to.be.eql(expectedAction);
        })
    });

    it('changes the tiles setting', () => {
      return homeArticlesListGetEpic(action$, mockState, { ajax })
        .toPromise()
        .then(() => {
          expect(getSettingsStub).to.be.calledOnce;
          expect(setSettingsSpy.withArgs({ tiles: false })).to.be.calledOnce;
        });
    });
  });

  describe('if errors has thrown', () => {
    const message = 'error';
    const ajax = { post: () => Observable.throw({ message }) };

    const expectedAction = { type: constants.HOME_ARTICLE_LIST_GET_ERROR, payload: { message } };

    it('returns an error action', () => {
      return homeArticlesListGetEpic(action$, mockState, { ajax })
        .toPromise()
        .then(outputAction => {
          expect(outputAction).to.be.eql(expectedAction);
        })
    });
  });
});
