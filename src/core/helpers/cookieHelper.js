import Cookies from 'universal-cookie';

let cookies;

export default {
  setUpCookie: (cookieInstance) => {
    if (cookieInstance) {
      cookies = cookieInstance;
    } else {
      cookies = new Cookies();
    }
  },
  set: (value, name, settings = { path: '/', maxAge: 1800 }) => {
    if (!cookies) {
      return;
    }

    cookies.set(name, value, settings);
  },
  get: (name) => {
    if (!cookies) {
      return null;
    }

    return cookies.get(name);
  },
  remove: (name, settings = { path: '/' }) => {
    if (!cookies) {
      return;
    }

    cookies.remove(name, settings);
  }
};
