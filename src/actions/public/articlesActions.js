import * as constants from '../../constants';

export function articlesArticleGet(slug) {
  return {
    type: constants.ARTICLES_ARTICLE_GET,
    payload: {
      slug
    }
  };
}

export function articlesDataLoadedReset() {
  return {
    type: constants.ARTICLES_DATA_LOADED_RESET
  };
}
