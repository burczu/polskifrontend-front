import * as constants from '../../constants';

export function homeBlogListGet(page) {
  return {
    type: constants.HOME_BLOG_LIST_GET,
    payload: {
      page
    }
  };
}

export function homeArticleListGet(page) {
  return {
    type: constants.HOME_ARTICLE_LIST_GET,
    payload: {
      page
    }
  };
}

export function homeAddLinkToClicked(url) {
  return {
    type: constants.HOME_ADD_LINK_TO_CLICKED,
    payload: {
      url
    }
  };
}

export function homeDataLoadedReset() {
  return {
    type: constants.HOME_DATA_LOADED_RESET
  };
}
