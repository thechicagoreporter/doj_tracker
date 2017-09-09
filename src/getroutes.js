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
const getRoutes = (
  statuses,
  window = null,
  shareUrl = '',
  facebookAppId = '',
) => {
  const paths = [
    '/recommendations/:id',
    '/agencies/:agencySlug',
    '/categories/:categorySlug',
    '/statuses/:statusSlug',
    '/',
  ];
  return paths.map((path, i) => (
    <Route key={i} path={path} render={props => (
      <TrackerApp statuses={statuses}
        window={window}
        shareUrl={shareUrl}
        facebookAppId={facebookAppId}
        {...props.match.params} />
    )} />
  ));
};

export default getRoutes;
