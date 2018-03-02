import validators from '../../../core/helpers/validators';
import * as constants from '../../../constants';
import { ActionsObservable } from 'redux-observable';
import { expect } from 'chai';
import { homeArticlesListGetRequestEpic } from './homeArticlesListGetRequestEpic';
import actions from '../../../actions/actions';

const getTriggeringAction = (page) => {
  const triggeringPayload = { page };
  return {
    type: constants.HOME_ARTICLE_LIST_GET_REQUEST,
    payload: triggeringPayload
  };
};

describe('homeArticlesListGetRequestEpic', () => {
  const mockState = { getState: () => ({ publicState: { homeState: { allArticlesList: [{ test: 'test' }] } } }) };
  describe('if page = 1', () => {
    const page = 1;
    const triggeringAction = getTriggeringAction(page);

    const expectedPayload = { page, articlesList: [] };
    const expectedAction = { type: constants.HOME_ARTICLE_LIST_GET, payload: expectedPayload };

    const action$ = ActionsObservable.of(triggeringAction);

    it('returns an action to start getting articles with empty articles list', () => {
      return homeArticlesListGetRequestEpic(action$, mockState)
        .toPromise()
        .then(outputAction => {
          expect(outputAction).to.be.eql(expectedAction);
        });
    });
  });

  describe('if page > 1', () => {
    const page = 2;
    const triggeringAction = getTriggeringAction(page);

    const expectedPayload = { page, articlesList: [{ test: 'test' }] };
    const expectedAction = { type: constants.HOME_ARTICLE_LIST_GET, payload: expectedPayload };

    const action$ = ActionsObservable.of(triggeringAction);

    it('returns an action to start getting articles with existing articles list', () => {
      return homeArticlesListGetRequestEpic(action$, mockState)
        .toPromise()
        .then(outputAction => {
          expect(outputAction).to.be.eql(expectedAction);
        })
    });
  });
});
