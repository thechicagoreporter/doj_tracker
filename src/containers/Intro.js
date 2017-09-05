import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { toggleIntro } from '../actions';
import styles from './Intro.css';
import { getHtml } from '../util';

const mapStateToProps = state => ({
  text: state.introText,
  collapsed: state.introCollapsed,
});

const mapDispatchToProps = dispatch => ({
  onToggleClick: () => {
    dispatch(toggleIntro());
  },
});

class Intro extends React.Component {
  constructor() {
    super();

    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  render() {
    const cx = classNames.bind(styles);

    const innerClassName = cx({
      inner: true,
      collapsed: this.props.collapsed,
    });

    const toggleClassName = cx({
      toggle: true,
      collapsed: this.props.collapsed,
      expanded: !this.props.collapsed,
    });

    const label = this.props.collapsed ?
      'Read more' :
      'Show less';

    return (
      <div className={styles.intro}>
        <button
          className={toggleClassName}
          onClick={this.handleToggleClick}>

          {label}
        </button>
        <div className={innerClassName}
          dangerouslySetInnerHTML={getHtml(this.props.text)} />
      </div>
    );
  }

  handleToggleClick(evt) {
    evt.preventDefault();
    this.props.onToggleClick();
  }
}

Intro.propTypes = {
  text: PropTypes.string,
  collapsed: PropTypes.bool,
  onToggleClick: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Intro);
