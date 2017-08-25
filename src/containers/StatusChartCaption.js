import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import styles from './StatusChartCaption.css';

const mapStateToProps = state => ({
  text: state.chartCaption,
});

const getHtml = text => ({
  __html: text,
});

const StatusChartCaption = ({ text }) => (
  <figcaption className={styles.caption} dangerouslySetInnerHTML={getHtml(text)} />
);

StatusChartCaption.propTypes = {
  text: PropTypes.string,
};

export default connect(mapStateToProps)(StatusChartCaption);
