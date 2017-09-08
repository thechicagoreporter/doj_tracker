/* eslint camelcase: 0 */
import PropTypes from 'prop-types';
import React from 'react';
import { DESC, LAST_UPDATED } from '../constants';
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
import StatusChartTitle from '../containers/StatusChartTitle';
import StatusChartCaption from '../containers/StatusChartCaption';
import CreditBox from '../containers/CreditBox';
import SocialWidgets from './SocialWidgets';
import styles from './TrackerApp.css';

/**
 * Return initial filter sets.
 *
 * @param {string} agencySlug - Slug representing an agency filter value.
 *   This will probably come from a URL router parameter.
 * @param {string} statusSlug - Slug representing a status filter value.
 *   This will probably come from a URL router parameter.
 * @param {string} categorySlug - Slug representing a category filter value.
 *   This will probably come from a URL router parameter.
 * @returns {Object} Object with properties for each collection of filters.
 *    Values will be sets containing the initial filter values based
 *    on the slug parameters to this function.
 */
const getInitialFilters = (agencySlug, statusSlug, categorySlug) => {
  const category = unslugify(categorySlug);
  const status = unslugify(statusSlug);
  const agency = unslugify(agencySlug);
  return {
    agencies: agency ? new Set([agency]) : new Set(),
    categories: category ? new Set([category]) : new Set(),
    statuses: status ? new Set([status]) : new Set(),
  };
};

/**
 * Main component for this application.
 *
 * This composes most of the other components in the application.
 */
const TrackerApp = ({
  statuses,
  id,
  agencySlug,
  categorySlug,
  statusSlug,
  window,
  facebookAppId,
}) => {
  const initialFilters = getInitialFilters(
    agencySlug,
    statusSlug,
    categorySlug,
  );

  return (
    <div className={styles.tracker}>
      <Lede />
      <Intro />
      <StatusChartTitle />
      <figure className={styles.figure}>
        <StatusChartLegend statuses={statuses} />
        <StatusChart statuses={statuses} window={window} />
        <StatusChartCaption />
      </figure>
      <SocialWidgets
        location={window ? window.location : null}
        facebookAppId={facebookAppId}
        window={window} />
      <ActiveSearchForm />
      <Filters initialFilters={initialFilters} />
      <VisibleOrderByControls>
        <OrderByControl
          orderBy={LAST_UPDATED}
          defaultDirection={DESC}
          label="Last Updated" />
      </VisibleOrderByControls>
      <VisibleRecommendationList detailId={id}
        initialFilters={initialFilters} />
      <CreditBox />
    </div>
  );
};

TrackerApp.propTypes = {
  /**
   * Object representing the statuses of recommendations.
   *
   * It should have an `all` property that is an array of objects, each with
   * a `slug` property and a `status` property, and a `selected` property which
   * is a set of strings corresponding to the `status` values of the objects.
   */
  statuses: PropTypes.object,
  /**
   * Recommendation ID for the recommendation that should be shown in detail.
   * That is, it will be expanded and the window will be scolled to its
   * element.
   */
  id: PropTypes.string,
  /**
   * Slug of agency that should be used to initially filter the list of
   * recommendations.
   */
  agencySlug: PropTypes.string,
  /**
   * Slug of category that should be used to initially filter the list of
   * recommendations.
   */
  categorySlug: PropTypes.string,
  /**
   * Slug of status that should be used to initially filter the list of
   * recommendations.
   */
  statusSlug: PropTypes.string,
  /**
   * DOM window object.
   */
  window: PropTypes.object,
  /**
   * Facebook application ID, used to enable sharing recommendations on
   * Facebook.
   */
  facebookAppId: PropTypes.string,
};

export default TrackerApp;
