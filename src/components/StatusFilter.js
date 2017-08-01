import PropTypes from 'prop-types';
import React from 'react';

const getClassName = (status, selected) => {
  const classes = [
    'status-filter',
    `status-filter--${status.slug}`,
  ];

  if (selected) {
    classes.push('status-filter--selected');
  }

  return classes.join(' ');
};

class StatusFilter extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <a href="#"
        className={getClassName(this.props.status, this.props.selected)}
        onClick={this.handleClick}>

        {this.props.status.status}
      </a>
    );
  }

  handleClick(evt) {
    evt.preventDefault();
    this.props.onFilterClick(this.props.status.status);
  }
}

StatusFilter.propTypes = {
  onFilterClick: PropTypes.func,
  selected: PropTypes.bool,
  status: PropTypes.shape({
    status: PropTypes.string,
  }),
};

export default StatusFilter;
