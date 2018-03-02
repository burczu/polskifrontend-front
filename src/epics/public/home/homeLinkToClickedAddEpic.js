import * as constants from '../../../constants';
import { Observable } from 'rxjs/Observable';
import _ from 'lodash';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';

export const homeLinkToClickedAddEpic = (action$, { getState }) => {
  return action$.ofType(constants.HOME_ADD_LINK_TO_CLICKED)
    .mergeMap((action) => {
      const { url } = action.payload;
      const state = getState().publicState.homeState;
      const links = _.cloneDeep(state.clickedLinks);

      links.push(url);

      return Observable.of({
        type: constants.HOME_UPDATE_CLICKED_LIST,
        payload: { links }
      });
    });
};
