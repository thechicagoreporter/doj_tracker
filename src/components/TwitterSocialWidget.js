import PropTypes from 'prop-types';
import React from 'react';
import TwitterIcon from './TwitterIcon';
import styles from './TwitterSocialWidget.css';

const getShareUrl = (location) => {
  const encoded = encodeURI(location);
  return `https://twitter.com/intent/tweet?url=${encoded}`;
};

class TwitterSocialWidget extends React.Component {
  render() {
    if (!this.props.location) {
      return false;
    }

    const shareUrl = getShareUrl(this.props.location);
    const handleClick = (evt) => {
      evt.preventDefault();
      if (this.props.window) {
        this.props.window.open(shareUrl);
      }
    };

    return (
      <a href={shareUrl} onClick={handleClick} className={styles.widget}>
        <TwitterIcon width="24px" height="24px" />
      </a>
    );
  }
}

TwitterSocialWidget.propTypes = {
  location: PropTypes.object,
  window: PropTypes.object,
};

export default TwitterSocialWidget;
