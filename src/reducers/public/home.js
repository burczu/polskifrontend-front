import * as constants from '../../constants';

export const initialState = {
  blogList: [],
  blogListNextPage: 1,
  blogListLoading: false,
  blogListError: false,
  blogListErrorMessage: '',
  blogProposalUrl: '',
  blogProposalUrlValid: true,

  allArticlesList: [],
  allArticlesNextPage: 1,
  allArticlesListLoading: false,
  allArticlesListError: false,
  allArticlesListErrorMessage: '',

  isListOptionSelected: false,
  isTilesOptionSelected: true,

  clickedLinks: [],

  dataLoaded: false
};

export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case constants.HOME_DATA_LOADED_RESET:
      return { ...state, dataLoaded: false };

    case constants.HOME_BLOG_LIST_GET:
      return {
        ...state,
        blogList: action.payload.blogList,
        blogListLoading: true,
        blogListError: false,
        blogListErrorMessage: ''
      };
    case constants.HOME_BLOG_LIST_GET_SUCCESS:
      return {
        ...state,
        blogList: action.payload.blogs,
        blogListNextPage: action.payload.nextPage,
        blogListLoading: false,
        blogListError: false,
        blogListErrorMessage: '',
        isTilesOptionSelected: true,
        isListOptionSelected: false
      };
    case constants.HOME_BLOG_LIST_GET_ERROR:
      return {
        ...state,
        blogListLoading: false,
        blogListError: true,
        blogListErrorMessage: action.payload.message
      };

    case constants.HOME_ARTICLE_LIST_GET:
      return {
        ...state,
        allArticlesListLoading: true,
        allArticlesList: action.payload.articlesList,
        allArticlesListError: false,
        allArticlesListErrorMessage: ''
      };
    case constants.HOME_ARTICLE_LIST_GET_SUCCESS:
      return {
        ...state,
        allArticlesList: action.payload.articles,
        allArticlesNextPage: action.payload.nextPage,
        allArticlesListLoading: false,
        allArticlesListError: false,
        allArticlesListErrorMessage: '',
        isTilesOptionSelected: false,
        isListOptionSelected: true
      };
    case constants.HOME_ARTICLE_LIST_GET_ERROR:
      return {
        ...state,
        allArticlesListLoading: false,
        allArticlesListError: true,
        allArticlesListErrorMessage: action.payload.message
      };

    case constants.HOME_CLICKED_LIST_UPDATE:
      return { ...state, clickedLinks: action.payload.links };
    default:
      return { ...state };
  }
}
