/* eslint camelcase: 0 */
import PropTypes from 'prop-types';
import React from 'react';
import StatusChartLegend from './StatusChartLegend';
import StatusChart from './StatusChart';
import Intro from './Intro';
import ActiveSearchForm from '../containers/ActiveSearchForm';
import SelectedStatusFilters from '../containers/SelectedStatusFilters';
import VisibleCategoryList from '../containers/VisibleCategoryList';

const TrackerApp = ({ title, intro_text, statuses }) => (
  <div className="tracker">
    <h1>{title}</h1>
    <Intro text={intro_text} />
    <StatusChartLegend statuses={statuses} />
    <StatusChart statuses={statuses} />
    <ActiveSearchForm />
    <SelectedStatusFilters />
    <VisibleCategoryList />
  </div>
);

TrackerApp.propTypes = {
  title: PropTypes.string,
  intro_text: PropTypes.string,
  statuses: PropTypes.arrayOf(PropTypes.object),
};

export default TrackerApp;
