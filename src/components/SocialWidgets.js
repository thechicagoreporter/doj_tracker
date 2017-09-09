import PropTypes from 'prop-types';
import React from 'react';
import styles from './SocialWidgets.css';

import FacebookSocialWidget from './FacebookSocialWidget';
import TwitterSocialWidget from '../containers/TwitterSocialWidget';
import EmailSocialWidget from '../containers/EmailSocialWidget';

const SocialIcons = ({ shareUrl, facebookAppId, window }) => (
  <div className={styles.socialWidgets}>
    <TwitterSocialWidget
      shareUrl={shareUrl}
      window={window} />
    <FacebookSocialWidget
      shareUrl={shareUrl}
      appId={facebookAppId}
      window={window} />
    <EmailSocialWidget
      shareUrl={shareUrl} />
  </div>
);

SocialIcons.propTypes = {
  shareUrl: PropTypes.string,
  facebookAppId: PropTypes.string,
  window: PropTypes.object,
};

export default SocialIcons;
