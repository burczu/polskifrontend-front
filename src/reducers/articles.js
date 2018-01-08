import * as constants from '../constants';

export const initialState = {
  article: {},
  articleLoading: false,
  articleError: false,

  dataLoaded: false
};

export default function articlesReducer(state = initialState, action) {
  switch (action.type) {
    case constants.ARTICLES_DATA_LOADED_RESET:
      return { ...state, dataLoaded: false };

    case constants.ARTICLES_ARTICLE_GET:
      return { ...state, articleLoading: true, articleError: false };
    case constants.ARTICLES_ARTICLE_GET_SUCCESS:
      return {
        ...state,
        articleLoaded: true,
        articleLoading: false,
        articleError: false,
        article: action.payload.article
      };
    case constants.ARTICLES_ARTICLE_GET_ERROR:
      return { ...state, articleLoaded: false, articleLoading: false, articleError: true };
    default:
      return { ...state };
  }
}
