import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import EnvelopeIcon from '../components/EnvelopeIcon';
import styles from './EmailSocialWidget.css';

const mapStateToProps = (state, ownProps) => ({
  subject: state.shareEmailSubject,
  body: state.shareEmailBody,
  shareUrl: ownProps.shareUrl,
});

const EmailSocialWidget = ({ shareUrl, subject, body }) => {
  const bodyEncoded = encodeURIComponent(body);
  const mailtoUrl = `mailto:?subject=${subject}&body=${bodyEncoded} ${shareUrl}.`;

  return (
    <a href={mailtoUrl} className={styles.widget}>
      <EnvelopeIcon width="24px" height="24px" />
    </a>
  );
};

EmailSocialWidget.propTypes = {
  shareUrl: PropTypes.string,
  subject: PropTypes.string,
  body: PropTypes.string,
};

export default connect(mapStateToProps)(EmailSocialWidget);
