import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getHtml } from '../util';
import styles from './StatusChartCaption.css';

const mapStateToProps = state => ({
  text: state.chartCaption,
});

const StatusChartCaption = ({ text }) => (
  <figcaption className={styles.caption} dangerouslySetInnerHTML={getHtml(text)} />
);

StatusChartCaption.propTypes = {
  text: PropTypes.string,
};

export default connect(mapStateToProps)(StatusChartCaption);
