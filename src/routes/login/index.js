import React from 'react';
import Login from './Login';
import Layout from '../../components/Layout/Layout';

export default {
  path: '/login',
  async action(context) {
    // TODO: clear token and use different layout

    return {
      component: (
        <Layout>
          <Login context={context} />
        </Layout>
      )
    };
  }
};
