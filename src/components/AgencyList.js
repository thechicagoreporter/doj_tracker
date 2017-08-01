import PropTypes from 'prop-types';
import React from 'react';

const AgencyList = ({ agencies }) => (
  <ul className="agencies">
    {agencies.map(agency => (
      <li key={agency} className="agency">{agency}</li>
    ))}
  </ul>
);

AgencyList.propTypes = {
  agencies: PropTypes.arrayOf(PropTypes.string),
};

export default AgencyList;
