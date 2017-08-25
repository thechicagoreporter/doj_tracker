import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getHtml } from '../util';
import styles from './Lede.css';

const mapStateToProps = state => ({
  text: state.lede,
});

const Lede = ({ text }) => (
  <div className={styles.lede} dangerouslySetInnerHTML={getHtml(text)} />
);

Lede.propTypes = {
  text: PropTypes.string,
};

export default connect(mapStateToProps)(Lede);
