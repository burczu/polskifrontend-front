import * as constants from '../../constants';

export function homeBlogListGetRequest(page) {
  return {
    type: constants.HOME_BLOG_LIST_GET_REQUEST,
    payload: {
      page
    }
  };
}

export function homeArticleListGetRequest(page) {
  return {
    type: constants.HOME_ARTICLE_LIST_GET_REQUEST,
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
