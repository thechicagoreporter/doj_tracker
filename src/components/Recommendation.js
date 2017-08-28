import classNames from 'classnames/bind';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AgencyList from './AgencyList';
import ShowMoreButton from './ShowMoreButton';
import UpdateList from './UpdateList';
import styles from './Recommendation.css';
import { camelCase, getHtml } from '../util';

const cx = classNames.bind(styles);

const getClassName = props => cx(
  'recommendation',
  camelCase(props.recommendation.statusSlug, '-'),
);

class Recommendation extends React.Component {
  constructor() {
    super();

    this.handleShowMoreClick = this.handleShowMoreClick.bind(this);
  }

  render() {
    const expansionClassName = cx({
      expansion: true,
      collapsed: this.props.recommendation.collapsed,
    });

    const hiddenLabelClassName = cx('label', 'hidden');

    const lastUpdated = this.props.recommendation.updates[0].date;

    return (
      <div className={getClassName(this.props)} ref={this.props.scrollToRef}>
        <h3 className={styles.gist}>
          {this.props.recommendation.recommendation_gist}
        </h3>

        <Link to={`/recommendations/${this.props.recommendation.id}`}
              className={styles.permalink}>🔗</Link>

        <dl className={styles.propertyList}>
          <div>
            <dt className={hiddenLabelClassName}>Status</dt>
            <dd className={cx('value', 'status', camelCase(this.props.recommendation.statusSlug, '-'))}>
               {this.props.recommendation.status}
            </dd>
          </div>

          <div>
            <dt className={hiddenLabelClassName}>Category</dt>
            <dd className={cx('value', 'category')}>{this.props.recommendation.category}</dd>
          </div>

          <div>
            <dt className={cx('label', 'lastUpdated')}>Last updated</dt>
            <dt className={cx('value', 'lastUpdated')}>{lastUpdated}</dt>
          </div>
        </dl>

        <div className={styles.showMoreCtaContainer}>
          <ShowMoreButton onClick={this.handleShowMoreClick}
            collapsed={this.props.recommendation.collapsed} />
        </div>

        <div className={expansionClassName}>
          <dl className={styles.propertyList}>
            <div>
              <dt className={styles.label}>Agencies responsible</dt>
              <dd className={styles.value}>
                <AgencyList agencies={this.props.recommendation.agency_responsible} />
              </dd>
            </div>
          </dl>
          <div className={styles.specific}
            dangerouslySetInnerHTML={
              getHtml(this.props.recommendation.recommendation_specific)
            } />

          <UpdateList updates={this.props.recommendation.updates} />
        </div>
      </div>
    );
  }

  handleShowMoreClick() {
    this.props.onToggleRecommendation(this.props.recommendation);
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
  onToggleRecommendation: PropTypes.func,
  scrollToRef: PropTypes.func,
};

export default Recommendation;
