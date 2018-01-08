import { combineEpics } from 'redux-observable';
import {
  getBlogListEpic,
  getBlogListRequestEpic,
  switchToListViewEpic,
  switchToListViewRequestEpic,
  addLinkToClickedEpic } from './public/home';
import {
  userChangeEpic,
  passwordChangeEpic,
  loginEpic } from './public/login';
import {
  urlChangedEpic,
  emailChangedEpic,
  sendBlogRequestEpic } from './public/submit';
import {
  feedbackTextChangedEpic,
  feedbackEmailChangedEpic,
  sendFeedbackEpic } from './public/feedback';
import { getNewsPageEpic } from './public/news';
import { articlesGetArticleEpic } from './public/articles';

const rootEpic = combineEpics(
  getBlogListEpic,
  getBlogListRequestEpic,
  switchToListViewEpic,
  switchToListViewRequestEpic,
  addLinkToClickedEpic,
  userChangeEpic,
  passwordChangeEpic,
  loginEpic,
  urlChangedEpic,
  emailChangedEpic,
  sendBlogRequestEpic,
  feedbackTextChangedEpic,
  feedbackEmailChangedEpic,
  sendFeedbackEpic,
  getNewsPageEpic,
  articlesGetArticleEpic
);

export default rootEpic;
