import React from 'react';
import BlogSubmit from './BlogSubmit';
import Layout from '../../components/Layout/Layout';

export default {
  path: '/zglos-serwis',
  async action(context) {
    return {
      component: (
        <Layout>
          <BlogSubmit context={context} />
        </Layout>
      )
    };
  }
};
