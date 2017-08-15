import PropTypes from 'prop-types';
import React from 'react';
import Filter from './Filter';

const FilterSet = ({
  items,
  onFilterClick,
  isSelected,
  getClassName,
  getLabel,
}) => (
  <div className="filter-set">
    <div>
      {items.map(item => (
        <Filter item={item}
          key={item.slug}
          onFilterClick={onFilterClick}
          selected={isSelected(item)}
          getClassName={getClassName}
          getLabel={getLabel} />
      ))}
    </div>
  </div>
);


FilterSet.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    slug: PropTypes.string,
  })),
  isSelected: PropTypes.func,
  onFilterClick: PropTypes.func,
  getClassName: PropTypes.func,
  getLabel: PropTypes.func,
};

export default FilterSet;
