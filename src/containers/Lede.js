import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  lede: state.lede,
});

const Lede = ({ lede }) => (
  <div className="lede">{lede}</div>
);

Lede.propTypes = {
  lede: PropTypes.string,
};

export default connect(mapStateToProps)(Lede);
