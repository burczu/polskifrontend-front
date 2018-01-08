import React from 'react';
import isNode from 'detect-node';
import Articles from './Articles';
import Layout from '../../components/Layout/Layout';
import getArticlesInitialState from '../../store/serverSideInitializers/articlesInitializer';
import * as actions from '../../actions/articlesActions';

export default {
  path: '/artykuly/:slug',
  async action(context) {
    const slug = context.params.slug;
    const state = context.store.getState().articlesState;

    if (isNode) {
      // server side loading
      const newState = await getArticlesInitialState(slug);
      context.store.getState().articlesState = { ...newState, dataLoaded: true };
    } else if (state.articleLoaded === false) {
      // client side loading
      context.store.dispatch(actions.articlesGetArticle(slug));
    }

    return {
      component: (
        <Layout>
          <Articles context={context} />
        </Layout>
      )
    };
  }
};
