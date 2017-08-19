import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './FilterDrawerToggle.css';

const cx = classNames.bind(styles);

class FilterDrawerToggle extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    const className = cx({
      button: true,
      collapsed: this.props.collapsed,
    });
    return (
      <a href="#"
        className={className}
        onClick={this.handleClick}>{this.getLabel()}</a>
    );
  }

  getLabel() {
    if (!this.props.collapsed) {
      return 'Hide filters';
    }
    const extra = this.props.filterCount ? ` (${this.props.filterCount})` : '';
    return `Show more filters${extra}`;
  }

  handleClick(evt) {
    evt.preventDefault();
    this.props.onToggleClick();
  }
}

FilterDrawerToggle.propTypes = {
  collapsed: PropTypes.bool,
  filterCount: PropTypes.number,
  onToggleClick: PropTypes.func,
};

export default FilterDrawerToggle;
