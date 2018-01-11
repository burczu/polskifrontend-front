/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom/server';
import { expect } from 'chai';
import HeaderSettings from './HeaderSettings';
import { Helmet } from 'react-helmet';

describe('HeaderSettings component', () => {
  it('renders Helmet settings in the documents head', () => {
    Helmet.canUseDOM = false;
    const text = ReactDOM.renderToString(
      <HeaderSettings currentPath="/current-path" description="test-description" title="test-title" />
    );
    const helmet = Helmet.renderStatic();
    const markup = ReactDOM.renderToStaticMarkup(
      <html>
        <head>
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
        </head>
        <body>
          {text}
        </body>
      </html>
    );

    expect(markup).to.contain('test-description');
    expect(markup).to.contain('test-title');
    expect(markup).to.contain('/current-path');
  });
});
