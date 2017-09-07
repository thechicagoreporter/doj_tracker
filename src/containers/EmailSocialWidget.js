import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import EnvelopeIcon from '../components/EnvelopeIcon';
import styles from './EmailSocialWidget.css';

const mapStateToProps = (state, ownProps) => ({
  subject: state.shareEmailSubject,
  body: state.shareEmailBody,
  location: ownProps.location,
});

const EmailSocialWidget = ({ location, subject, body }) => {
  if (!location) {
    return false;
  }

  const shareUrl = `mailto:?subject=${subject}&body=${body} ${location}`;

  return (
    <a href={shareUrl} className={styles.widget}>
      <EnvelopeIcon width="24px" height="24px" />
    </a>
  );
};

EmailSocialWidget.propTypes = {
  location: PropTypes.object,
  subject: PropTypes.string,
  body: PropTypes.string,
};

export default connect(mapStateToProps)(EmailSocialWidget);
