import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import TwitterIcon from '../components/TwitterIcon';
import styles from './TwitterSocialWidget.css';

const getShareUrl = (shareUrl, text) => {
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(text);
  return `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
};

const mapStateToProps = state => ({
  text: state.shareTweetText,
});

class TwitterSocialWidget extends React.Component {
  render() {
    const shareUrl = getShareUrl(
      this.props.shareUrl,
      this.props.text,
    );
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
  shareUrl: PropTypes.string,
  window: PropTypes.object,
  text: PropTypes.string,
};

export default connect(mapStateToProps)(TwitterSocialWidget);
