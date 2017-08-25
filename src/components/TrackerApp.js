/* eslint camelcase: 0 */
import PropTypes from 'prop-types';
import React from 'react';
import { LAST_UPDATED } from '../constants';
import { unslugify } from '../util';
import ActiveSearchForm from '../containers/ActiveSearchForm';
import VisibleOrderByControls from '../containers/VisibleOrderByControls';
import VisibleRecommendationList from '../containers/VisibleRecommendationList';
import Lede from '../containers/Lede';
import Filters from './Filters';
import Intro from '../containers/Intro';
import OrderByControl from './OrderByControl';
import StatusChart from './StatusChart';
import StatusChartLegend from './StatusChartLegend';
import StatusChartCaption from '../containers/StatusChartCaption';
import CreditBox from '../containers/CreditBox';
import styles from './TrackerApp.css';

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
  statuses,
  id,
  categorySlug,
  statusSlug,
}) => {
  const initialFilters = getInitialFilters(statusSlug, categorySlug);
  return (
    <div className={styles.tracker}>
      <Lede />
      <Intro />
      <figure className={styles.figure}>
        <StatusChartLegend statuses={statuses} />
        <StatusChart statuses={statuses} />
        <StatusChartCaption />
      </figure>
      <ActiveSearchForm />
      <Filters initialFilters={initialFilters} />
      <VisibleOrderByControls>
        <OrderByControl orderBy={LAST_UPDATED} label="Last Updated" />
      </VisibleOrderByControls>
      <VisibleRecommendationList detailId={id}
        initialFilters={initialFilters} />
      <CreditBox />
    </div>
  );
};

TrackerApp.propTypes = {
  statuses: PropTypes.object,
  id: PropTypes.string,
  categorySlug: PropTypes.string,
  statusSlug: PropTypes.string,
};

export default TrackerApp;
