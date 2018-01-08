import * as constants from '../constants';

export function newsPageGet(page) {
  return {
    type: constants.NEWS_PAGE_GET,
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
