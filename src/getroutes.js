import React from 'react';
import { Route } from 'react-router-dom';
import TrackerApp from './components/TrackerApp';

/**
 * Get React Router routes.
 *
 * Usually, when using React Router, you have paths mapping to different
 * components.  In our case, we're rendering the same component for all paths.
 * This is because we're just filtering and scrolling, but still rendering the
 * same things.
 */
const getRoutes = (statuses, window = null) => {
  const paths = [
    '/recommendations/:id',
    '/categories/:categorySlug',
    '/statuses/:statusSlug',
    '/',
  ];
  return paths.map((path, i) => (
    <Route key={i} path={path} render={props => (
      <TrackerApp statuses={statuses}
        window={window}
        {...props.match.params} />
    )} />
  ));
};

export default getRoutes;
