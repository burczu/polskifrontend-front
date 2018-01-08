import React from 'react';
import Feedback from './Feedback';
import Layout from '../../components/Layout/Layout';

export default {
  path: '/zglos-uwagi',
  async action(context) {
    return {
      component: (
        <Layout>
          <Feedback context={context} />
        </Layout>
      )
    };
  }
};
