import React from 'react';
import Layout from '../../components/Layout/Layout';
import About from './About';

export default {
  path: '/o-serwisie',
  async action(context) {
    return {
      component: (
        <Layout>
          <About context={context} />
        </Layout>
      )
    };
  }
};
