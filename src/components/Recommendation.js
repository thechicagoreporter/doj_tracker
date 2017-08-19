import classNames from 'classnames/bind';
import React from 'react';
import PropTypes from 'prop-types';
import AgencyList from './AgencyList';
import UpdateList from './UpdateList';
import styles from './Recommendation.css';
import { camelCase } from '../util';

const cx = classNames.bind(styles);

const getClassName = props => cx(
  'recommendation',
  camelCase(props.recommendation.statusSlug, '-'),
);

class Recommendation extends React.Component {
  constructor() {
    super();

    this.handleGistClick = this.handleGistClick.bind(this);
  }

  render() {
    const gistLinkClassName = cx({
      gistLink: true,
      collapsed: this.props.recommendation.collapsed,
    });

    const expansionClassName = cx({
      expansion: true,
      collapsed: this.props.recommendation.collapsed,
    });

    return (
      <div className={getClassName(this.props)} ref={this.props.scrollToRef}>
        <h3 className={styles.gist}>
          <a href="#" className={gistLinkClassName} onClick={this.handleGistClick}>
            {this.props.recommendation.recommendation_gist}
          </a>
        </h3>

        <div className={expansionClassName}>
          <div className={styles.category}>{this.props.recommendation.category}</div>

          <div>
            <span
              className={cx('status', camelCase(this.props.recommendation.statusSlug, '-'))}>

              {this.props.recommendation.status}
            </span>
          </div>

          <div className={styles.specific}>
              {this.props.recommendation.recommendation_specific}
          </div>

          <AgencyList agencies={this.props.recommendation.agency_responsible} />

          <UpdateList updates={this.props.recommendation.updates} />
        </div>
      </div>
    );
  }

  handleGistClick(evt) {
    evt.preventDefault();
    this.props.onGistClick(this.props.recommendation);
  }
}

Recommendation.propTypes = {
  recommendation: PropTypes.shape({
    category: PropTypes.string,
    agency_responsible: PropTypes.arrayOf(PropTypes.string),
    collapsed: PropTypes.bool,
    id: PropTypes.string,
    recommendation_specific: PropTypes.string,
    recommendation_gist: PropTypes.string,
    status: PropTypes.string,
    statusSlug: PropTypes.string,
    updates: PropTypes.arrayOf(PropTypes.object),
  }),
  onGistClick: PropTypes.func,
  scrollToRef: PropTypes.func,
};

export default Recommendation;
