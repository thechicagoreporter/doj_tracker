import PropTypes from 'prop-types';
import React from 'react';
import SelectedCategoryFilters from '../containers/SelectedCategoryFilters';
import SelectedStatusFilters from '../containers/SelectedStatusFilters';

const Filters = ({ initialFilters }) => (
  <div className="filters">
    <SelectedStatusFilters initialFilters={initialFilters} />
    <SelectedCategoryFilters initialFilters={initialFilters} />
  </div>
);

Filters.propTypes = {
  initialFilters: PropTypes.object,
};

export default Filters;
