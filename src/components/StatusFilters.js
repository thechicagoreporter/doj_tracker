import PropTypes from 'prop-types';
import React from 'react';
import StatusFilter from './StatusFilter';

const StatusFilters = ({ statuses, onFilterClick, statusSelected }) => (
  <div className="filters">
      <div className="filter-set">
          <h2 className="filter-set__label">Status</h2>

          <div>
            {statuses.map(status => (
              <StatusFilter status={status}
                key={status.slug}
                onFilterClick={onFilterClick}
                selected={statusSelected(status.status)} />
            ))}
          </div>
      </div>
  </div>
);

StatusFilters.propTypes = {
  statuses: PropTypes.arrayOf(PropTypes.shape({
    slug: PropTypes.string,
  })),
  onFilterClick: PropTypes.func,
  statusSelected: PropTypes.func,
};

export default StatusFilters;
