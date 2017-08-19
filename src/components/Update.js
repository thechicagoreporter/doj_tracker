import PropTypes from 'prop-types';
import React from 'react';
import styles from './Update.css';

const getHtml = update => ({
  __html: update.notes,
});

const Update = ({ update }) => (
  <li className={styles.update}>
    <h4>{update.date}</h4>
    <div dangerouslySetInnerHTML={getHtml(update)} />
  </li>
);

Update.propTypes = {
  update: PropTypes.shape({
    date: PropTypes.string,
    notes: PropTypes.string,
  }),
};

export default Update;
