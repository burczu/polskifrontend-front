import * as constants from '../constants';

export function getNewsPage(page) {
  return {
    type: constants.NEWS_GET_NEWS_PAGE,
    payload: {
      page
    }
  };
}

export function newsDataLoadedReset() {
  return {
    type: constants.NEWS_DATA_LOADED_RESET
  };
}
