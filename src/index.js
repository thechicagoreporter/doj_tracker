import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {
  HashRouter,
  Route,
  Switch,
} from 'react-router-dom';
import TrackerApp from './components/TrackerApp';
import { root as rootReducer } from './reducers';
import { hydrateState } from './util';
import './index.css';

// eslint-disable-next-line import/prefer-default-export
export const renderApp = (container, initialState, window) => {
  // Create a new Redux store instance
  const store = createStore(rootReducer, hydrateState(initialState));
  const state = store.getState();

  // Usually, when using React Router, you have paths mapping to different
  // components.  In our case, we're rendering the same component for all
  // paths. This is because we're just filtering and scrolling, but still
  // rendering the same things.
  const paths = [
    '/recommendations/:id',
    '/categories/:categorySlug',
    '/statuses/:statusSlug',
    '/',
  ];
  const children = paths.map((path, i) => (
    <Route key={i} path={path} render={props => (
      <TrackerApp statuses={state.statuses}
        window={window}
        {...props.match.params} />
    )} />
  ));

  // Render the component
  render(
    <Provider store={store}>
      <HashRouter>
        <Switch>
          {children}
        </Switch>
      </HashRouter>
    </Provider>,
    container,
  );
};
