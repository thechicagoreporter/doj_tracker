import PropTypes from 'prop-types';
import React from 'react';
import SelectedCategoryFilters from '../containers/SelectedCategoryFilters';
import SelectedStatusFilters from '../containers/SelectedStatusFilters';
import VisibleFilterDrawer from '../containers/VisibleFilterDrawer';

const Filters = ({ initialFilters }) => (
  <div className="filters">
    <SelectedStatusFilters initialFilters={initialFilters} />
    <VisibleFilterDrawer>
      <SelectedCategoryFilters collectionName="categories"
        initialFilters={initialFilters} />
    </VisibleFilterDrawer>
  </div>
);

Filters.propTypes = {
  initialFilters: PropTypes.object,
};

export default Filters;
