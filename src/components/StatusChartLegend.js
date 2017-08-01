import PropTypes from 'prop-types';
import React from 'react';

const StatusChartLegend = ({ statuses }) => (
  <dl className="status-chart-legend">
    {statuses.map(status => (
      <div key={status.slug} className="status-chart-legend__item">
        <dt className={`status-chart-legend__color status-chart-legend__color--${status.slug}`}></dt>
        <dd className="status-chart-legend__label">{status.status}</dd>
      </div>
    ))}
  </dl>
);

StatusChartLegend.propTypes = {
  statuses: PropTypes.arrayOf(PropTypes.shape({
    slug: PropTypes.string,
    status: PropTypes.string,
  })),
};

export default StatusChartLegend;
