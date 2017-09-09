import PropTypes from 'prop-types';
import React from 'react';
import styles from './RecommendationCount.css';

/**
 * Displays the number of visible recommendations and the total number of
 * recommendations.
 */
const RecommendationCount = ({ visible, total }) => (
  <div className={styles.count}>Showing {visible} of {total} recommendations.</div>
);

RecommendationCount.propTypes = {
  /**
   * Number of visible recommendations.
   */
  visible: PropTypes.number,
  /**
   * Total number of recommendations.
   */
  total: PropTypes.number,
};

export default RecommendationCount;
