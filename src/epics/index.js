import { combineEpics } from 'redux-observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import { articlesGetArticleEpic } from './public/articles/articlesGetArticleEpic';
import { feedbackEmailChangedEpic } from './public/feedback/feedbackEmailChangedEpic';
import { feedbackTextChangedEpic } from './public/feedback/feedbackTextChangedEpic';
import { feedbackSendEpic } from './public/feedback/feedbackSendEpic';
import {
  getBlogListEpic,
  getBlogListRequestEpic,
  switchToListViewEpic,
  switchToListViewRequestEpic,
  addLinkToClickedEpic
} from './public/home';
import {
  userChangeEpic,
  passwordChangeEpic,
  loginEpic
} from './public/login';
import {
  urlChangedEpic,
  emailChangedEpic,
  sendBlogRequestEpic
} from './public/submit';
import { getNewsPageEpic } from './public/news';

const rootEpic = (...args) => combineEpics(
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
  feedbackSendEpic,
  getNewsPageEpic,
  articlesGetArticleEpic
)(...args, { ajax });

export default rootEpic;
