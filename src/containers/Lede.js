import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import styles from './Lede.css';

const mapStateToProps = state => ({
  text: state.lede,
});

const getHtml = text => ({
  __html: text,
});

const Lede = ({ text }) => (
  <div className={styles.lede} dangerouslySetInnerHTML={getHtml(text)} />
);

Lede.propTypes = {
  text: PropTypes.string,
};

export default connect(mapStateToProps)(Lede);
