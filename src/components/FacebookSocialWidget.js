import PropTypes from 'prop-types';
import React from 'react';
import FacebookIcon from './FacebookIcon';

const getShareUrl = (location, appId) => {
  const encoded = encodeURI(location);
  return `https://www.facebook.com/dialog/share?app_id=${appId}&display=popup&href=${encoded}`;
};

class FacebookSocialWidget extends React.Component {
  render() {
    if (!this.props.location || !this.props.appId) {
      return false;
    }

    const shareUrl = getShareUrl(this.props.location, this.props.appId);
    const handleClick = (evt) => {
      evt.preventDefault();
      if (this.props.window) {
        this.props.window.open(shareUrl);
      }
    };

    return (
      <a href={shareUrl} onClick={handleClick}><FacebookIcon /></a>
    );
  }
}

FacebookSocialWidget.propTypes = {
  appId: PropTypes.string,
  location: PropTypes.object,
  window: PropTypes.object,
};

export default FacebookSocialWidget;
