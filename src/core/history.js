/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable no-undef */

import createBrowserHistory from 'history/createBrowserHistory';

// mocked object for the test purpose
let history = {
  push: () => 'test'
};

// Navigation manager, e.g. history.push('/home')
// https://github.com/mjackson/history
if (process.env.BROWSER) {
  history = createBrowserHistory();
}

export default history;
