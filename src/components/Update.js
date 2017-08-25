import PropTypes from 'prop-types';
import React from 'react';
import { getHtml } from '../util';
import styles from './Update.css';

const Update = ({ update }) => (
  <li className={styles.update}>
    <h4>{update.date}</h4>
    <div dangerouslySetInnerHTML={getHtml(update.notes)} />
  </li>
);

Update.propTypes = {
  update: PropTypes.shape({
    date: PropTypes.string,
    notes: PropTypes.string,
  }),
};

export default Update;
