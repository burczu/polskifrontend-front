/* eslint-disable import/prefer-default-export */

// global actions
export const GLOBALS_ROUTE_CHANGED = 'GLOBALS_ROUTE_CHANGED';

// home route actions
export const HOME_DATA_LOADED_RESET = 'HOME_DATA_LOADED_RESET';

export const HOME_GET_BLOG_LIST = 'HOME_GET_BLOG_LIST';
export const HOME_GET_BLOG_LIST_REQUEST = 'HOME_GET_BLOG_LIST_REQUEST';
export const HOME_GET_BLOG_LIST_SUCCESS = 'HOME_GET_BLOG_LIST_SUCCESS';
export const HOME_GET_BLOG_LIST_ERROR = 'HOME_GET_BLOG_LIST_ERROR';

export const HOME_SWITCH_TO_LIST_VIEW = 'HOME_SWITCH_TO_LIST_VIEW';
export const HOME_SWITCH_TO_LIST_VIEW_REQUEST = 'HOME_SWITCH_TO_LIST_VIEW_REQUEST';
export const HOME_SWITCH_TO_LIST_VIEW_SUCCESS = 'HOME_SWITCH_TO_LIST_VIEW_SUCCESS';
export const HOME_SWITCH_TO_LIST_VIEW_ERROR = 'HOME_SWITCH_TO_LIST_VIEW_ERROR';

export const HOME_ADD_LINK_TO_CLICKED = 'HOME_ADD_LINK_TO_CLICKED';
export const HOME_UPDATE_CLICKED_LIST = 'HOME_UPDATE_CLICKED_LIST';

// login route actions
export const LOGIN_USER_CHANGED = 'LOGIN_USER_CHANGED';
export const LOGIN_USER_CHANGED_VALID = 'LOGIN_USER_CHANGED_VALID';
export const LOGIN_PASSWORD_CHANGED = 'LOGIN_PASSWORD_CHANGED';
export const LOGIN_PASSWORD_CHANGED_VALID = 'LOGIN_PASSWORD_CHANGED_VALID';

export const LOGIN_INVOKE = 'LOGIN_INVOKE';
export const LOGIN_INVOKE_SUCCESS = 'LOGIN_INVOKE_SUCCESS';
export const LOGIN_INVOKE_ERROR = 'LOGIN_INVOKE_ERROR';

// submit actions
export const SUBMIT_URL_CHANGED = 'SUBMIT_URL_CHANGED';
export const SUBMIT_URL_CHANGED_VALID = 'SUBMIT_URL_CHANGED_VALID';
export const SUBMIT_EMAIL_CHANGED = 'SUBMIT_EMAIL_CHANGED';
export const SUBMIT_EMAIL_CHANGED_VALID = 'SUBMIT_EMAIL_CHANGED_VALID';
export const SUBMIT_CAPTCHA_CHANGED = 'SUBMIT_CAPTCHA_CHANGED';

export const SUBMIT_BLOG_SEND = 'SUBMIT_BLOG_SEND';
export const SUBMIT_BLOG_SEND_SUCCESS = 'SUBMIT_BLOG_SEND_SUCCESS';
export const SUBMIT_BLOG_SEND_ERROR = 'SUBMIT_BLOG_SEND_ERROR';

export const SUBMIT_RESET_STATE = 'SUBMIT_RESET_STATE';

// feedback actions
export const FEEDBACK_TEXT_CHANGED = 'FEEDBACK_TEXT_CHANGED';
export const FEEDBACK_TEXT_CHANGED_VALID = 'FEEDBACK_TEXT_CHANGED_VALID';
export const FEEDBACK_EMAIL_CHANGED = 'FEEDBACK_EMAIL_CHANGED';
export const FEEDBACK_EMAIL_CHANGED_VALID = 'FEEDBACK_EMAIL_CHANGED_VALID';
export const FEEDBACK_CAPTCHA_CHANGED = 'FEEDBACK_CAPTCHA_CHANGED';

export const FEEDBACK_SEND = 'FEEDBACK_SEND';
export const FEEDBACK_SEND_SUCCESS = 'FEEDBACK_SEND_SUCCESS';
export const FEEDBACK_SEND_ERROR = 'FEEDBACK_SEND_ERROR';

export const FEEDBACK_RESET_STATE = 'FEEDBACK_RESET_STATE';

// news actions
export const NEWS_DATA_LOADED_RESET = 'NEWS_DATA_LOADED_RESET';

export const NEWS_GET_NEWS_PAGE = 'NEWS_GET_NEWS_PAGE';
export const NEWS_GET_NEWS_PAGE_SUCCESS = 'NEWS_GET_NEWS_PAGE_SUCCESS';
export const NEWS_GET_NEWS_PAGE_ERROR = 'NEWS_GET_NEWS_PAGE_ERROR';

// articles actions
export const ARTICLES_CLEAR_DATA_LOADED = 'ARTICLES_CLEAR_DATA_LOADED';

export const ARTICLES_GET_ARTICLE = 'ARTICLES_GET_ARTICLE';
export const ARTICLES_GET_ARTICLE_SUCCESS = 'ARTICLES_GET_ARTICLE_SUCCESS';
export const ARTICLES_GET_ARTICLE_ERROR = 'ARTICLES_GET_ARTICLE_ERROR';
