import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';
import { setOrderBy } from '../actions';
import styles from './OrderByControl.css';

const cx = classNames.bind(styles);

class OrderByControl extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    const className = cx({
      control: !this.props.selected,
      controlSelected: this.props.selected,
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
    setOrderBy(this.props.orderBy);
  }
}

OrderByControl.propTypes = {
  orderBy: PropTypes.string,
  selected: PropTypes.bool,
  label: PropTypes.string,
};

export default OrderByControl;
