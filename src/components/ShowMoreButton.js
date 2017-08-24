import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './ShowMoreButton.css';

const cx = classNames.bind(styles);

class ShowMoreButton extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    const text = this.props.collapsed ?
      this.props.collapsedText :
      this.props.expandedText;

    const buttonClass = cx({
      collapsed: this.props.collapsed,
      expanded: !this.props.collapsed,
    });

    return (
      <a href="#" className={buttonClass} onClick={this.handleClick}>{text}</a>
    );
  }

  handleClick(evt) {
    evt.preventDefault();
    this.props.onClick();
  }
}

ShowMoreButton.defaultProps = {
  collapsedText: 'Read more',
  expandedText: 'Show less',
};

ShowMoreButton.propTypes = {
  collapsed: PropTypes.bool,
  collapsedText: PropTypes.string,
  expandedText: PropTypes.string,
  onClick: PropTypes.func,
};

export default ShowMoreButton;
