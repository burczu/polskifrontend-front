/* eslint-disable max-len, no-undef */
export const port = process.env.PORT || 3000;
export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;

export const analytics = {
  // https://analytics.google.com/
  google: {
    trackingId: 'UA-35451047-5' // UA-XXXXX-X
  }
};

export const getDefaultHeaders = () => {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Basic YnVyY3p1OmFiY2RmcmJrMzQwMzQxZmRzZnZkcw=='
  };
};


const api = {
  dev: {
    url: 'http://localhost:8880'
  },
  prod: {
    url: 'https://polskifrontend-back.herokuapp.com'
  }
};

export const apiUrl = __DEV__ ? api.dev.url : api.prod.url;
