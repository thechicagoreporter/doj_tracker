import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';
import { camelCase } from '../util';
import styles from './StatusChartLegend.css';

const cx = classNames.bind(styles);

const StatusChartLegend = ({ statuses }) => (
  <dl className={styles.legend}>
    {statuses.all.map(status => (
      <div key={status.slug} className={styles.item}>
        <dt className={cx('color', camelCase(status.status))} />
        <dd className={styles.label}>{status.status}</dd>
      </div>
    ))}
  </dl>
);

StatusChartLegend.propTypes = {
  statuses: PropTypes.shape({
    all: PropTypes.arrayOf(PropTypes.shape({
      slug: PropTypes.string,
      status: PropTypes.string,
    })),
  }),
};

export default StatusChartLegend;
