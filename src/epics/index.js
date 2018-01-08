import { combineEpics } from 'redux-observable';
import {
  getBlogListEpic,
  getBlogListRequestEpic,
  switchToListViewEpic,
  switchToListViewRequestEpic,
  addLinkToClickedEpic } from './home';
import {
  userChangeEpic,
  passwordChangeEpic,
  loginEpic } from './login';
import {
  urlChangedEpic,
  emailChangedEpic,
  sendBlogRequestEpic } from './submit';
import {
  feedbackTextChangedEpic,
  feedbackEmailChangedEpic,
  sendFeedbackEpic } from './feedback';
import { getNewsPageEpic } from './news';
import { articlesGetArticleEpic } from './articles';

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
