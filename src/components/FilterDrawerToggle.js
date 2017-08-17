import PropTypes from 'prop-types';
import React from 'react';
import { modifierClassNames } from '../util';

class FilterDrawerToggle extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    const className = modifierClassNames(
      'filters__toggle-button',
      this.props.collapsed,
      'collapsed',
    );
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
