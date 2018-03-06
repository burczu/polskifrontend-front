import * as constants from '../../constants';

export const initialState = {
  article: {},
  articleLoaded: false,
  articleLoading: false,
  articleError: false,
  articleErrorMessage: '',

  dataLoaded: false
};

export default function articlesReducer(state = initialState, action) {
  switch (action.type) {
    case constants.ARTICLES_DATA_LOADED_RESET:
      return { ...state, dataLoaded: false };

    case constants.ARTICLES_ARTICLE_GET:
      return {
        ...state,
        articleLoaded: false,
        articleLoading: true,
        articleError: false,
        articleErrorMessage: ''
      };
    case constants.ARTICLES_ARTICLE_GET_SUCCESS:
      return {
        ...state,
        articleLoaded: true,
        articleLoading: false,
        articleError: false,
        articleErrorMessage: '',
        article: action.payload.article
      };
    case constants.ARTICLES_ARTICLE_GET_ERROR:
      return {
        ...state,
        articleLoaded: false,
        articleLoading: false,
        articleError: true,
        articleErrorMessage: action.payload.message
      };
    default:
      return { ...state };
  }
}
