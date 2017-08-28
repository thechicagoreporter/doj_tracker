import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {
  HashRouter,
  Switch,
} from 'react-router-dom';
import { root as rootReducer } from './reducers';
import { hydrateState } from './util';
import getRoutes from './getroutes';
import './index.css';

// eslint-disable-next-line import/prefer-default-export
export const renderApp = (container, initialState, window) => {
  // Create a new Redux store instance
  const store = createStore(rootReducer, hydrateState(initialState));
  const state = store.getState();
  const routes = getRoutes(state.statuses, window);

  // Render the component
  render(
    <Provider store={store}>
      <HashRouter>
        <Switch>
          {routes}
        </Switch>
      </HashRouter>
    </Provider>,
    container,
  );
};
