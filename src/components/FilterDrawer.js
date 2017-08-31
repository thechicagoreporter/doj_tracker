import PropTypes from 'prop-types';
import React from 'react';
import FilterDrawerToggle from './FilterDrawerToggle';
import styles from './FilterDrawer.css';

const FilterDrawer = ({ collapsed, filterCount, onToggleClick, children }) => {
  const visibleChildren = collapsed ? null : children;
  return (
    <div className={styles.drawer}>
      <FilterDrawerToggle collapsed={collapsed}
        filterCount={filterCount}
        onToggleClick={onToggleClick} />
      <div>
        {visibleChildren}
      </div>
    </div>
  );
};

FilterDrawer.propTypes = {
  collapsed: PropTypes.bool,
  filterCount: PropTypes.number,
  onToggleClick: PropTypes.func,
  children: PropTypes.array,
};

export default FilterDrawer;
