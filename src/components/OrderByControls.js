import PropTypes from 'prop-types';
import React from 'react';
import styles from './OrderByControls.css';

const OrderByControls = ({ orderBy, children }) => (
  <div className={styles.controls}>
    <div className={styles.label}>Order By</div>
    <div>
      {React.Children.map(children, child => React.cloneElement(child, {
        selected: child.props.orderBy === orderBy,
      }))}
    </div>
  </div>
);

OrderByControls.propTypes = {
  orderBy: PropTypes.string,
  children: PropTypes.object,
};

export default OrderByControls;
