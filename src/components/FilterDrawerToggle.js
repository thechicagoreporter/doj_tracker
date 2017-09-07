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
      collapsed: this.props.collapsed,
      expanded: !this.props.collapsed,
    });
    return (
      <button
        className={className}
        onClick={this.handleClick}>{this.getLabel()}</button>
    );
  }

  getLabel() {
    if (!this.props.collapsed) {
      return 'Hide filters';
    }
    const extra = this.props.filterCount ? ` (${this.props.filterCount})` : '';
    return `Filter by category, agency${extra}`;
  }

  handleClick() {
    this.props.onToggleClick();
  }
}

FilterDrawerToggle.propTypes = {
  collapsed: PropTypes.bool,
  filterCount: PropTypes.number,
  onToggleClick: PropTypes.func,
};

export default FilterDrawerToggle;
