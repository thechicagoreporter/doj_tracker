import PropTypes from 'prop-types';
import React from 'react';
import styles from './SocialWidgets.css';

import FacebookSocialWidget from './FacebookSocialWidget';
import TwitterSocialWidget from '../containers/TwitterSocialWidget';
import EmailSocialWidget from '../containers/EmailSocialWidget';

const SocialIcons = ({ location, facebookAppId, window }) => (
  <div className={styles.socialWidgets}>
    <TwitterSocialWidget
      location={location}
      window={window} />
    <FacebookSocialWidget
      location={location}
      appId={facebookAppId}
      window={window} />
    <EmailSocialWidget
      location={location} />
  </div>
);

SocialIcons.propTypes = {
  location: PropTypes.object,
  facebookAppId: PropTypes.string,
  window: PropTypes.object,
};

export default SocialIcons;
