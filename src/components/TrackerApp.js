/* eslint camelcase: 0 */
import PropTypes from 'prop-types';
import React from 'react';
import StatusChartLegend from './StatusChartLegend';
import StatusChart from './StatusChart';
import Intro from './Intro';
import ActiveSearchForm from '../containers/ActiveSearchForm';
import SelectedStatusFilters from '../containers/SelectedStatusFilters';
import VisibleRecommendationList from '../containers/VisibleRecommendationList';

const TrackerApp = ({ title, introText, statuses }) => (
  <div className="tracker">
    <h1>{title}</h1>
    <Intro text={introText} />
    <StatusChartLegend statuses={statuses} />
    <StatusChart statuses={statuses} />
    <ActiveSearchForm />
    <SelectedStatusFilters />
    <VisibleRecommendationList />
  </div>
);

TrackerApp.propTypes = {
  title: PropTypes.string,
  introText: PropTypes.string,
  statuses: PropTypes.arrayOf(PropTypes.object),
};

export default TrackerApp;
