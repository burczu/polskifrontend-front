import { expect } from 'chai';
import * as constants from '../../../constants';
import { ActionsObservable } from 'redux-observable';
import { homeBlogListGetRequestEpic } from './homeBlogListGetRequestEpic';

const getTriggeringAction = (page) => {
  const triggeringPayload = { page };
  return {
    type: constants.HOME_BLOG_LIST_GET_REQUEST,
    payload: triggeringPayload
  };
};

describe('homeArticlesListGetRequestEpic', () => {
  const mockState = { getState: () => ({ publicState: { homeState: { blogList: [{ test: 'test' }] } } }) };
  describe('if page = 1', () => {
    const page = 1;
    const triggeringAction = getTriggeringAction(page);

    const expectedPayload = { page, blogList: [] };
    const expectedAction = { type: constants.HOME_BLOG_LIST_GET, payload: expectedPayload };

    const action$ = ActionsObservable.of(triggeringAction);

    it('returns an action to start getting blogs with empty blog list', () => {
      return homeBlogListGetRequestEpic(action$, mockState)
        .toPromise()
        .then(outputAction => {
          expect(outputAction).to.be.eql(expectedAction);
        });
    });
  });

  describe('if page > 1', () => {
    const page = 2;
    const triggeringAction = getTriggeringAction(page);

    const expectedPayload = { page, blogList: [{ test: 'test' }] };
    const expectedAction = { type: constants.HOME_BLOG_LIST_GET, payload: expectedPayload };

    const action$ = ActionsObservable.of(triggeringAction);

    it('returns an action to start getting blogs with existing blogs list', () => {
      return homeBlogListGetRequestEpic(action$, mockState)
        .toPromise()
        .then(outputAction => {
          expect(outputAction).to.be.eql(expectedAction);
        });
    });
  });
});
