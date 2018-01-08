import { combineReducers } from 'redux';
import homeReducer from './home';
import loginReducer from './login';
import submitReducer from './submit';
import feedbackReducer from './feedback';
import newsReducer from './news';
import articlesReducer from './articles';

export default combineReducers({
  homeState: homeReducer,
  loginState: loginReducer,
  submitState: submitReducer,
  feedbackState: feedbackReducer,
  newsState: newsReducer,
  articlesState: articlesReducer
});
