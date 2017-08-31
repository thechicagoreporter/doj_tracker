import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';
import { ASC, DESC } from '../constants';
import styles from './OrderByControl.css';

const cx = classNames.bind(styles);

const oppositeDirection = (direction) => {
  if (direction === ASC) {
    return DESC;
  }

  return ASC;
};

class OrderByControl extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    const className = cx({
      control: !this.props.selected,
      controlSelected: this.props.selected,
      descending: this.props.direction === DESC,
      ascending: this.props.direction === ASC,
    });
    return (
      <button
        onClick={this.handleClick}
        className={className}>

        {this.props.label}
      </button>
    );
  }

  handleClick() {
    const direction = this.props.selected ?
      oppositeDirection(this.props.direction) :
      this.props.defaultDirection;

    this.props.setOrderBy(this.props.orderBy, direction);
  }
}

OrderByControl.propTypes = {
  orderBy: PropTypes.string,
  direction: PropTypes.string,
  defaultDirection: PropTypes.string,
  selected: PropTypes.bool,
  label: PropTypes.string,
  setOrderBy: PropTypes.func,
};

export default OrderByControl;
