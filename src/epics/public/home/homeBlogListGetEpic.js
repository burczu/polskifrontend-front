import { getBlogsQuery } from '../../../graphql/queries/blogs';
import { apiUrl, getDefaultHeaders } from '../../../config';
import * as constants from '../../../constants';
import settingsHelper from '../../../core/helpers/settingsHelper';
import { Observable } from 'rxjs/Observable';
import _ from 'lodash';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/takeUntil';

const turnOnTilesSetting = () => {
  const tilesSettings = settingsHelper.getSettings();
  tilesSettings.tiles = true;
  settingsHelper.saveSettings(tilesSettings);
};

const getModifiedBlogList = (state, blogs) => {
  const newBlogList = _.cloneDeep(state.blogList);
  newBlogList.push(...blogs);
  return newBlogList;
};

export const homeBlogListGetEpic = (action$, { getState }, { ajax }) => {
  return action$.ofType(constants.HOME_BLOG_LIST_GET)
    .mergeMap((action) => {
      const { page } = action.payload;
      return ajax.post(`${apiUrl}/public/graphql`, getBlogsQuery(page), getDefaultHeaders())
        .map(responseData => {
          const { blogs, nextPage } = responseData.response.data.blogs;
          const state = getState().publicState.homeState;
          turnOnTilesSetting();

          return {
            type: constants.HOME_BLOG_LIST_GET_SUCCESS,
            payload: { blogs: getModifiedBlogList(state, blogs), nextPage }
          };
        })
        .takeUntil(action$.ofType(constants.GLOBALS_ROUTE_CHANGED))
        .catch(error => Observable.of({
          type: constants.HOME_BLOG_LIST_GET_ERROR,
          payload: { message: error.message }
        }));
    });
};
