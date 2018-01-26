import cookies from './cookieHelper';

const cookieName = 'PL_FRONT_END';

export default {
  saveLoginToken: (token) => {
    cookies.set(token, cookieName);
  },
  getLoginToken: () => {
    return cookies.get(cookieName);
  },
  clearLoginToken: () => {
    cookies.remove(cookieName);
  }
};
