import PropTypes from 'prop-types';
import React from 'react';
import { setOrderBy } from '../actions';
import { modifierClassNames } from '../util';

class OrderByControl extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    const className = modifierClassNames(
      'order-by-control',
      this.props.selected,
      'selected',
    );
    return (
      <a href="#"
        onClick={this.handleClick}
        className={className}>

        {this.props.label}
      </a>
    );
  }

  handleClick(evt) {
    evt.preventDefault();
    setOrderBy(this.props.orderBy);
  }
}

OrderByControl.propTypes = {
  orderBy: PropTypes.string,
  selected: PropTypes.bool,
  label: PropTypes.string,
};

export default OrderByControl;
