import PropTypes from 'prop-types';
import React from 'react';

const getBarClassName = status => (
  `status-chart__bar status-chart__bar--${status.slug}`
);

const getBarStyle = status => ({
  width: `${status.pctRecommendations * 100}%`,
});

const StatusChart = ({ statuses }) => (
  <div className="status-chart">
    {statuses.all.map(status => (
      <div className={getBarClassName(status)}
           style={getBarStyle(status)}
           key={status.slug}>

           <span className="status-chart__bar-label">{status.count}</span>
      </div>
    ))}
  </div>
);

StatusChart.propTypes = {
  statuses: PropTypes.shape({
    all: PropTypes.arrayOf(PropTypes.shape({
      slug: PropTypes.string,
      status: PropTypes.string,
    })),
  }),
};

export default StatusChart;
