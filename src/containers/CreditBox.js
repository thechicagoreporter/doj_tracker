import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getHtml } from '../util';
import styles from './CreditBox.css';

const mapStateToProps = state => ({
  text: state.credits,
});

const CreditBox = ({ text }) => (
  <div className={styles.creditBox} dangerouslySetInnerHTML={getHtml(text)} />
);

CreditBox.propTypes = {
  text: PropTypes.string,
};

export default connect(mapStateToProps)(CreditBox);
