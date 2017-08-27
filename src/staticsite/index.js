import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { root as rootReducer } from '../reducers';
import { pruneProps } from '../transforms';
import { hydrateState } from '../util';
import renderFullPage from './render-full-page';
import TrackerApp from '../components/TrackerApp';

module.exports = (locals) => {
  // Create a new Redux store instance
  const rawState = pruneProps(locals);
  const store = createStore(rootReducer, hydrateState(rawState));
  const state = store.getState();

  // Render the component to a string
  const html = renderToString(
    <Provider store={store}>
      <TrackerApp statuses={state.statuses} />
    </Provider>,
  );

  return renderFullPage({
    appHtml: html,
    title: locals.title,
  }, rawState);
};
