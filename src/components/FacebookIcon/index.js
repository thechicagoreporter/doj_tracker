import PropTypes from 'prop-types';
import React from 'react';
import styles from './index.css';

const FacebookIcon = ({ width, height }) => (
  /* eslint-disable max-len */
  <svg className={styles.icon} width={width} height={height} viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
    <title id="title">Facebook Icon</title>
    <path d="M1343 12v264h-157q-86 0-116 36t-30 108v189h293l-39 296h-254v759h-306v-759h-255v-296h255v-218q0-186 104-288.5t277-102.5q147 0 228 12z"/>
  </svg>
);

FacebookIcon.defaultProps = {
  width: '32px',
  height: '32px',
};

FacebookIcon.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

export default FacebookIcon;
