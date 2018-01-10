/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom/server';
import { expect } from 'chai';
import sinon from 'sinon';
import HeaderSettings from './HeaderSettings';
import { Helmet } from 'react-helmet';
import { mount } from 'enzyme/build/index';

describe('HeaderSettings component', () => {
  let consoleStub;
  beforeEach(() => {
    consoleStub = sinon.stub(console, 'error');
  });

  afterEach(() => {
    consoleStub.restore();
  });

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

  it('calls console.error function when no "currentPath" provided', () => {
    mount(
      <HeaderSettings description="test-description" title="test-title" />
    );

    expect(console.error).to.be.calledOnce;
  });

  it('calls console.error function when no "description" provided', () => {
    mount(
      <HeaderSettings currentPath="/current-path" title="test-title" />
    );

    expect(console.error).to.be.calledOnce;
  });

  it('calls console.error function when no "title" provided', () => {
    mount(
      <HeaderSettings description="test-description" currentPath="/current-path" />
    );

    expect(console.error).to.be.calledOnce;
  });
});
