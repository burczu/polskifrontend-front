import { combineReducers } from 'redux';
import homeReducer from './home';
import loginReducer from './login';
import adminReducer from './admin';
import adminBlogsReducer from './adminBlogs';
import adminNewsReducer from './adminNews';
import submitReducer from './submit';
import feedbackReducer from './feedback';
import newsReducer from './news';
import articlesReducer from './articles';

export default combineReducers({
  homeState: homeReducer,
  loginState: loginReducer,
  adminState: adminReducer,
  adminBlogsState: adminBlogsReducer,
  adminNewsState: adminNewsReducer,
  submitState: submitReducer,
  feedbackState: feedbackReducer,
  newsState: newsReducer,
  articlesState: articlesReducer
});
