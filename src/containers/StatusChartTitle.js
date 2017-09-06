import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import styles from './StatusChartTitle.css';

const mapStateToProps = state => ({
  text: state.chartTitle,
});

const StatusChartTitle = ({ text }) => (
  text ? <h3 className={styles.title}>{text}</h3> : false
);

StatusChartTitle.propTypes = {
  text: PropTypes.string,
};

export default connect(mapStateToProps)(StatusChartTitle);
