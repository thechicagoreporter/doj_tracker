import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';
import { camelCase } from '../util';
import styles from './StatusChart.css';

const cx = classNames.bind(styles);

const getBarClassName = status => (
  cx('bar', camelCase(status.status))
);

const getBarStyle = status => ({
  width: `${status.pctRecommendations * 100}%`,
});

const StatusChart = ({ statuses }) => (
  <div className={styles.chart}>
    {statuses.all.map(status => (
      <div className={getBarClassName(status)}
           style={getBarStyle(status)}
           key={status.slug}>

           <span className={styles.barLabel}>{status.count}</span>
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
