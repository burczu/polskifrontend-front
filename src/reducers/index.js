import { combineReducers } from 'redux';
import homeReducer from './public/home';
import submitReducer from './public/submit';
import feedbackReducer from './public/feedback';
import newsReducer from './public/news';
import articlesReducer from './public/articles';

export default combineReducers({
  publicState: combineReducers({
    homeState: homeReducer,
    submitState: submitReducer,
    feedbackState: feedbackReducer,
    newsState: newsReducer,
    articlesState: articlesReducer
  })
});
