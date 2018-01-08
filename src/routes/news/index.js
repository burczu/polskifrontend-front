import React from 'react';
import News from './News';
import Layout from '../../components/Layout/Layout';
import * as settingsHelper from '../../core/helpers/settingsHelper';
import * as actions from '../../actions/newsActions';
import isNode from 'detect-node';
import getNewsInitialState from '../../store/serverSideInitializers/newsInitializer';

export default {
  path: '/aktualnosci',
  async action(context) {
    // update visit date to check if there are new items
    const settings = settingsHelper.getSettings();
    settings.lastNewsVisit = Date.now();
    settingsHelper.saveSettings(JSON.stringify(settings));

    const state = context.store.getState().newsState;

    if (isNode) {
      // server side loading
      const newState = await getNewsInitialState();
      context.store.getState().newsState = { ...newState, dataLoaded: true };
    } else if (state.dataLoaded === false) {
      // client side loading
      context.store.dispatch(actions.newsPageGet(1));
    }

    return {
      component: <Layout><News context={context} /></Layout>
    };
  }
};
