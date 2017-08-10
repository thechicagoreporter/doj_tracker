import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {
  HashRouter,
  Route,
} from 'react-router-dom';
import TrackerApp from './components/TrackerApp';
import { root as rootReducer } from './reducers';
import { hydrateState } from './util';
import './index.scss';

// eslint-disable-next-line import/prefer-default-export
export const renderApp = (container, initialState) => {
  // Create a new Redux store instance
  const store = createStore(rootReducer, hydrateState(initialState));
  const state = store.getState();

  // Render the component
  render(
    <Provider store={store}>
      <HashRouter>
      <Route path="/" render={() => (
        <TrackerApp statuses={state.statuses}
          title={state.title}
          introText={state.intro_text} />
        )} />
      </HashRouter>
    </Provider>,
    container,
  );
};
