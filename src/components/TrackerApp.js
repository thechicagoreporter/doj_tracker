/* eslint camelcase: 0 */
import PropTypes from 'prop-types';
import React from 'react';
import StatusChartLegend from './StatusChartLegend';
import StatusChart from './StatusChart';
import Intro from './Intro';
import ActiveSearchForm from '../containers/ActiveSearchForm';
import Filters from './Filters';
import VisibleRecommendationList from '../containers/VisibleRecommendationList';
import { unslugify } from '../util';

/**
 * Return initial filter sets.
 *
 * @param {string} statusSlug - Slug representing a status filter value.
 *   This will probably come from a URL router parameter.
 * @param {string} categorySlug - Slug representing a category filter value.
 *   This will probably come from a URL router parameter.
 * @returns {Object} Object with properties for each collection of filters.
 *    Values will be sets containing the initial filter values based
 *    on the slug parameters to this function.
 */
const getInitialFilters = (statusSlug, categorySlug) => {
  const category = unslugify(categorySlug);
  const status = unslugify(statusSlug);
  return {
    categories: category ? new Set([category]) : new Set(),
    statuses: status ? new Set([status]) : new Set(),
  };
};

const TrackerApp = ({
  title,
  introText,
  statuses,
  id,
  categorySlug,
  statusSlug,
}) => {
  const initialFilters = getInitialFilters(statusSlug, categorySlug);
  return (
    <div className="tracker">
      <h1>{title}</h1>
      <Intro text={introText} />
      <StatusChartLegend statuses={statuses} />
      <StatusChart statuses={statuses} />
      <ActiveSearchForm />
      <Filters initialFilters={initialFilters} />
      <VisibleRecommendationList detailId={id}
        initialFilters={initialFilters} />
    </div>
  );
};

TrackerApp.propTypes = {
  title: PropTypes.string,
  introText: PropTypes.string,
  statuses: PropTypes.object,
  id: PropTypes.string,
  categorySlug: PropTypes.string,
  statusSlug: PropTypes.string,
};

export default TrackerApp;
