import React from 'react';
import { renderToString } from 'react-dom/server';
import {
  HashRouter,
  Switch,
} from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { root as rootReducer } from '../reducers';
import { pruneProps } from '../transforms';
import { hydrateState } from '../util';
import getRoutes from '../getroutes';
import renderFullPage from './render-full-page';

module.exports = (locals) => {
  // Create a new Redux store instance
  const rawState = pruneProps(locals);
  const store = createStore(rootReducer, hydrateState(rawState));
  const state = store.getState();
  const routes = getRoutes(
    state.statuses,
    null,
    locals.shareUrl,
    locals.facebookAppId,
  );

  // Render the component to a string
  const html = renderToString(
    <Provider store={store}>
      <HashRouter>
        <Switch>
          {routes}
        </Switch>
      </HashRouter>
    </Provider>,
  );

  return renderFullPage({
    appHtml: html,
    title: locals.title,
    shareUrl: locals.shareUrl,
    facebookAppId: locals.facebookAppId,
  }, rawState);
};
