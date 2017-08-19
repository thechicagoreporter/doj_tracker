import PropTypes from 'prop-types';
import React from 'react';
import styles from './AgencyList.css';

const AgencyList = ({ agencies }) => (
  <ul className={styles.agencies}>
    {agencies.map(agency => (
      <li key={agency} className={styles.agency}>{agency}</li>
    ))}
  </ul>
);

AgencyList.propTypes = {
  agencies: PropTypes.arrayOf(PropTypes.string),
};

export default AgencyList;
