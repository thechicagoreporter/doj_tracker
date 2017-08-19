import PropTypes from 'prop-types';
import React from 'react';
import Update from './Update';
import styles from './UpdateList.css';

const UpdateList = ({ updates }) => (
  <ul className={styles.updates}>
    {updates.map((update, i) => (
      <Update update={update} key={i} />
    ))}
  </ul>
);

UpdateList.propTypes = {
  updates: PropTypes.arrayOf(PropTypes.object),
};

export default UpdateList;
