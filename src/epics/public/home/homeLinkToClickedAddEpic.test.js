/* eslint-disable */
import { expect } from 'chai';
import * as constants from '../../../constants';
import { homeLinkToClickedAddEpic } from './homeLinkToClickedAddEpic';
import { ActionsObservable } from 'redux-observable';
import 'rxjs/add/operator/toPromise';

describe('homeLinkToClickedAddEpic', () => {
  const mockedState = { getState: () => ({ publicState: { homeState: { clickedLinks: [] } } }) };

  const triggeringPayload = { url: '/test' };
  const triggeringAction = { type: constants.HOME_ADD_LINK_TO_CLICKED, payload: triggeringPayload };

  const action$ = ActionsObservable.of(triggeringAction);

  const expectedPayload = { links: ['/test'] };
  const expectedAction = { type: constants.HOME_UPDATE_CLICKED_LIST, payload: expectedPayload };

  it('returns an action which updates clicked links list', () => {
    return homeLinkToClickedAddEpic(action$, mockedState)
      .toPromise()
      .then(outputAction => {
        expect(outputAction).to.be.eql(expectedAction);
      });
  });
});
