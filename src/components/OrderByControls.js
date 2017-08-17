import PropTypes from 'prop-types';
import React from 'react';

const OrderByControls = ({ orderBy, children }) => (
  <div className="order-by-controls">
    <div className="order-by-controls__label">Order By</div>
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
