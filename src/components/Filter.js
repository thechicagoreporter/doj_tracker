import PropTypes from 'prop-types';
import React from 'react';

class Filter extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <button
        className={this.props.getClassName(this.props.item, this.props.selected)}
        onClick={this.handleClick}>

        {this.props.getLabel(this.props.item)}
      </button>
    );
  }

  handleClick() {
    this.props.onFilterClick(this.props.item);
  }
}

Filter.propTypes = {
  onFilterClick: PropTypes.func,
  selected: PropTypes.bool,
  item: PropTypes.object,
  getClassName: PropTypes.func,
  getLabel: PropTypes.func,
};

export default Filter;
