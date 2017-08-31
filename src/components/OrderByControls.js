import PropTypes from 'prop-types';
import React from 'react';
import styles from './OrderByControls.css';

const OrderByControls = ({ orderBy, direction, children, setOrderBy }) => (
  <div className={styles.controls}>
    <div className={styles.label}>Order By</div>
    <div>
      {React.Children.map(children, child => React.cloneElement(child, {
        selected: child.props.orderBy === orderBy,
        direction,
        setOrderBy,
      }))}
    </div>
  </div>
);

OrderByControls.propTypes = {
  orderBy: PropTypes.string,
  direction: PropTypes.string,
  children: PropTypes.array,
  setOrderBy: PropTypes.func,
};

export default OrderByControls;
