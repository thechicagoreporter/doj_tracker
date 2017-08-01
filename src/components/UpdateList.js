import PropTypes from 'prop-types';
import React from 'react';

import Update from './Update';

const UpdateList = ({ updates }) => (
  <ul className="recommendation__updates">
    {updates.map((update, i) => (
      <Update update={update} key={i} />
    ))}
  </ul>
);

UpdateList.propTypes = {
  updates: PropTypes.arrayOf(PropTypes.object),
};

export default UpdateList;
