import PropTypes from 'prop-types';
import React from 'react';
import FilterDrawerToggle from './FilterDrawerToggle';

const FilterDrawer = ({ collapsed, filterCount, onToggleClick, children }) => {
  const visibleChildren = collapsed ? null : children;
  return (
    <div className="filters__drawer">
      <FilterDrawerToggle collapsed={collapsed}
        filterCount={filterCount}
        onToggleClick={onToggleClick} />
      <div className="filters__drawer-inner">
        {visibleChildren}
      </div>
    </div>
  );
};

FilterDrawer.propTypes = {
  collapsed: PropTypes.bool,
  filterCount: PropTypes.number,
  onToggleClick: PropTypes.func,
  children: PropTypes.object,
};

export default FilterDrawer;
