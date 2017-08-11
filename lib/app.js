import archieml from 'archieml';
import express from 'express';
import flow from 'lodash/fp/flow';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { root as rootReducer } from '../src/reducers';
import { hydrateState } from '../src/util';
import { dldoc } from './google-drive';
import {
   recommendationLookup,
   addCategories,
   addStatusSlugs,
   groupByStatus,
   markdownifyIntro,
   addSelectedStatuses,
 } from './transforms';
import renderFullPage from './render-full-page';
import TrackerApp from '../src/components/TrackerApp';

const app = express();

const transform = flow(
  recommendationLookup,
  addStatusSlugs,
  markdownifyIntro,
  groupByStatus,
  addSelectedStatuses,
);

app.use((req, res, next) => {
  const chunks = [];
  dldoc(req.app.locals.docUrl, req.app.locals.oauth2Client)
    .on('data', data => chunks.push(data))
    .on('end', () => {
      const data = Buffer.concat(chunks).toString();
      const transformed = transform(archieml.load(data));
      req.app.locals.data = transformed;
      next();
    })
    .on('error', (err) => {
      console.log(`Cannot download Google Document: ${err}`);
    });
});

app.get('/', (req, res) => {
  // Create a new Redux store instance
  const store = createStore(rootReducer, hydrateState(req.app.locals.data));
  const state = store.getState();

  // Render the component to a string
  const html = renderToString(
    <Provider store={store}>
      <TrackerApp statuses={state.statuses}
        title={state.title}
        introText={state.intro_text} />
    </Provider>,
  );

  // Send the rendered page back to the client
  res.send(renderFullPage({
    appHtml: html,
    title: req.app.locals.data.title,
  }, req.app.locals.data));
});

app.get('/recommendations.json', (req, res) => {
  res.json(req.app.locals.data);
});

export default app;
