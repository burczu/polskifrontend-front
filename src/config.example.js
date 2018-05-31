/* eslint-disable max-len, no-undef */
export const port = process.env.PORT || 3000;
export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;

export const analytics = {
  // https://analytics.google.com/
  google: {
    trackingId: 'UA-XXXXXXXX-X' // UA-XXXXX-X
  }
};

export const getDefaultHeaders = (withToken = false) => {
  const result = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  if (withToken) {
    result['X-Access-Token'] = 'XXX'; // get it from cookie or something
  }

  return result;
};

const api = {
  dev: {
    url: 'http://localhost:port'
  },
  prod: {
    url: 'http://example.remote.srv'
  }
};

export const apiUrl = __DEV__ ? api.dev.url : api.prod.url;
