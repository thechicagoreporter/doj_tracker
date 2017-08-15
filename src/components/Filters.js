import React from 'react';
import SelectedCategoryFilters from '../containers/SelectedCategoryFilters';
import SelectedStatusFilters from '../containers/SelectedStatusFilters';

const Filters = () => (
  <div className="filters">
    <SelectedStatusFilters />
    <SelectedCategoryFilters />
  </div>
);

export default Filters;
