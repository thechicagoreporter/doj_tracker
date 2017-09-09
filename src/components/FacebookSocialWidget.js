import PropTypes from 'prop-types';
import React from 'react';
import FacebookIcon from './FacebookIcon';
import styles from './FacebookSocialWidget.css';

const getShareUrl = (shareUrl, appId) => {
  const encoded = encodeURI(shareUrl);
  return `https://www.facebook.com/dialog/share?app_id=${appId}&display=popup&href=${encoded}`;
};

class FacebookSocialWidget extends React.Component {
  render() {
    const shareUrl = getShareUrl(this.props.shareUrl, this.props.appId);
    const handleClick = (evt) => {
      evt.preventDefault();
      if (this.props.window) {
        this.props.window.open(shareUrl);
      }
    };

    return (
      <a href={shareUrl} onClick={handleClick} className={styles.widget}>
        <FacebookIcon width="24px" height="24px" />
      </a>
    );
  }
}

FacebookSocialWidget.propTypes = {
  appId: PropTypes.string,
  shareUrl: PropTypes.string,
  window: PropTypes.object,
};

export default FacebookSocialWidget;
