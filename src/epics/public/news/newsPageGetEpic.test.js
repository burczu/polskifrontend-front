/* eslint-disable */
import { expect } from 'chai';
import * as constants from '../../../constants';
import { newsPageGetEpic } from './newsPageGetEpic';
import { Observable } from 'rxjs/Observable';
import { ActionsObservable } from 'redux-observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';

describe('newsPageGetEpic', () => {
  const page = 1;
  const mockState = { getState: () => ({ publicState: { newsState: { newsList: [] } } }) };

  const triggeringPayload = { page };
  const triggeringAction = { type: constants.NEWS_PAGE_GET, payload: triggeringPayload };

  const action$ = ActionsObservable.of(triggeringAction);

  describe('if everything ok', () => {
    const mockResponse = { response: { data: { newses: { newses: [{ test: 'test' }], nextPage: 2 } } } };
    const ajax = { post: () => Observable.of(mockResponse) };

    const expectedPayload = { newsList: [{ test: 'test' }], nextPage: 2 };
    const expectedAction = { type: constants.NEWS_PAGE_GET_SUCCESS, payload: expectedPayload };

    it('returns success action with updated news list', () => {
      return newsPageGetEpic(action$, mockState, { ajax })
        .toPromise()
        .then(outputAction => {
          expect(outputAction).to.be.eql(expectedAction);
        });
    });
  });

  describe('if any error received', () => {
    const error = { message: 'error' };
    const ajax = { post: () => Observable.throw(error) };

    const expectedPayload = { message: error.message };
    const expectedAction = { type: constants.NEWS_PAGE_GET_ERROR, payload: expectedPayload };

    it('returns correct error action', () => {
      return newsPageGetEpic(action$, mockState, { ajax })
        .toPromise()
        .then(outputAction => {
          expect(outputAction).to.be.eql(expectedAction);
        });
    });
  });
});
