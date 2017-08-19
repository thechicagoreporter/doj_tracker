import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import styles from './Lede';

const mapStateToProps = state => ({
  lede: state.lede,
});

const Lede = ({ lede }) => (
  <div className={styles.lede}>{lede}</div>
);

Lede.propTypes = {
  lede: PropTypes.string,
};

export default connect(mapStateToProps)(Lede);
