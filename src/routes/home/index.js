import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout/Layout';
import * as actions from '../../actions/public/homeActions';
import isNode from 'detect-node';
import settingsHelper from '../../core/helpers/settingsHelper';
import getHomeInitialState from '../../store/serverSideInitializers/homeInitializer';

export default {
  path: '/',
  async action(context) {
    const settings = settingsHelper.getSettings();
    const state = context.store.getState().publicState.homeState;

    if (isNode) {
      // server side loading
      const newState = await getHomeInitialState(settings);
      context.store.getState().publicState.homeState = { ...newState, dataLoaded: true };
    } else if (state.dataLoaded === false) {
      // client side loading
      if (settings.tiles) {
        context.store.dispatch(actions.homeBlogListGetRequest(1));
      } else {
        context.store.dispatch(actions.homeArticleListGetRequest(1));
      }
    }

    return {
      component: (
        <Layout>
          <Home context={context} />
        </Layout>
      )
    };
  }
};
