import PropTypes from 'prop-types';
import React from 'react';
import { getHtml } from '../util';
import styles from './ContentBox.css';

const ContentBox = ({ text }) => (
  <div className={styles.contentBox}>
    <div className="series-divider">
      <div className="divider-line"></div>
    </div>

    <div dangerouslySetInnerHTML={getHtml(text)} />
  </div>
);

ContentBox.propTypes = {
  text: PropTypes.string,
};

export default ContentBox;
