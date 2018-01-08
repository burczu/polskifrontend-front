import * as constants from '../constants';

export const initialState = {
  blogList: [],
  blogListNextPage: 1,
  blogListLoading: false,
  blogListError: false,
  articlesLoading: false,
  articlesError: false,
  blogProposalUrl: '',
  blogProposalUrlValid: true,

  allArticlesList: [],
  allArticlesNextPage: 1,
  allArticlesListLoading: false,
  allArticlesListError: false,

  isListOptionSelected: false,
  isTilesOptionSelected: true,

  clickedLinks: [],

  dataLoaded: false
};

export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case constants.HOME_DATA_LOADED_RESET:
      return { ...state, dataLoaded: false };

    case constants.HOME_BLOG_LIST_GET_REQUEST:
      return { ...state, blogListLoading: true, blogList: action.payload.blogList, blogListError: false };
    case constants.HOME_BLOG_LIST_GET_SUCCESS:
      return { ...state, blogList: action.payload.blogs, blogListNextPage: action.payload.nextPage, blogListLoading: false, isTilesOptionSelected: true, isListOptionSelected: false };
    case constants.HOME_BLOG_LIST_GET_ERROR:
      return { ...state, blogListLoading: false, blogListError: true };

    case constants.HOME_ARTICLE_LIST_GET_REQUEST:
      return { ...state, allArticlesListLoading: true, allArticlesList: action.payload.articlesList, allArticlesListError: false };
    case constants.HOME_ARTICLE_LIST_GET_SUCCESS:
      return { ...state, allArticlesList: action.payload.articles, allArticlesNextPage: action.payload.nextPage, allArticlesListLoading: false, isTilesOptionSelected: false, isListOptionSelected: true };
    case constants.HOME_ARTICLE_LIST_GET_ERROR:
      return { ...state, allArticlesListLoading: false, allArticlesListError: true };

    case constants.HOME_UPDATE_CLICKED_LIST:
      return { ...state, clickedLinks: action.payload.links };
    default:
      return { ...state };
  }
}
