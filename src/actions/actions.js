import * as homeActions from './public/homeActions';
import * as submitActions from './public/submitActions';
import * as feedbackActions from './public/feedbackActions';
import * as newsActions from './public/newsActions';
import * as articlesActions from './public/articlesActions';

const actions = {
  publicActions: [
    homeActions,
    submitActions,
    feedbackActions,
    newsActions,
    articlesActions
  ],
  restrictedActions: []
};

export default actions;
