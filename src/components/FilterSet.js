import PropTypes from 'prop-types';
import React from 'react';
import Filter from './Filter';
import styles from './FilterSet.css';

const FilterSet = ({
  label,
  items,
  onFilterClick,
  isSelected,
  getClassName,
  getLabel,
  initialRender,
}) => (
  <div className={styles.set}>
    <div className={styles.label}>{label}</div>
    <div>
      {items.map(item => (
        <Filter item={item}
          key={item.slug}
          onFilterClick={f => onFilterClick(f, initialRender)}
          selected={isSelected(item)}
          getClassName={getClassName}
          getLabel={getLabel} />
      ))}
    </div>
  </div>
);


FilterSet.propTypes = {
  label: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    slug: PropTypes.string,
  })),
  isSelected: PropTypes.func,
  onFilterClick: PropTypes.func,
  getClassName: PropTypes.func,
  getLabel: PropTypes.func,
  initialRender: PropTypes.bool,
  collectionName: PropTypes.string,
};

export default FilterSet;
