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
    this.collapse = this.collapse.bind(this);
    this.expand = this.expand.bind(this);
    this.onTransitioned = this.onTransitioned.bind(this);
  }

  render() {
    const expansionClassName = cx({
      expansion: true,
      collapsed: this.props.recommendation.collapsed,
    });

    const hiddenLabelClassName = cx('label', 'hidden');

    const lastUpdated = this.props.recommendation.updates[0].date;

    const agenciesLabel = (
      this.props.recommendation.agency_responsible.length === 1 ?
      'Agency' :
      'Agencies'
    );

    return (
      <div className={getClassName(this.props)} ref={this.props.scrollToRef}>
        <h3 className={styles.gist} onClick={this.handleShowMoreClick}>
          <span className={styles.gistText}>{this.props.recommendation.recommendation_gist}</span>
          <ShowMoreButton
            collapsed={this.props.recommendation.collapsed} />
        </h3>

        <Link to={`/recommendations/${this.props.recommendation.id}`}
              className={styles.permalink}>🔗</Link>

        <div className={expansionClassName}
          ref={(el) => { this.expansionEl = el; }}>
          <div className={styles.specific}
            dangerouslySetInnerHTML={
              getHtml(this.props.recommendation.recommendation_specific)
            } />

          <UpdateList updates={this.props.recommendation.updates} />

          <dl className={styles.propertyList}>
            <div className={cx('propertyGroup', 'solo')}>
              <dt className={styles.label}>{agenciesLabel} responsible</dt>
              <dd className={styles.value}>
                <AgencyList agencies={this.props.recommendation.agency_responsible} />
              </dd>
            </div>
          </dl>
        </div>

        <dl className={styles.propertyList}>
          <div className={styles.propertyGroup}>
            <dt className={hiddenLabelClassName}>Status</dt>
            <dd className={cx('value', 'status', camelCase(this.props.recommendation.statusSlug, '-'))}>
               {this.props.recommendation.status}
            </dd>
          </div>

          <div className={styles.propertyGroup}>
            <dt className={hiddenLabelClassName}>Category</dt>
            <dd className={cx('value', 'category')}>{this.props.recommendation.category}</dd>
          </div>

          <div className={styles.propertyGroup}>
            <dt className={cx('label', 'lastUpdated')}>Last updated</dt>
            <dd className={cx('value', 'lastUpdated')}>{lastUpdated}</dd>
          </div>
        </dl>
      </div>
    );
  }

  componentDidMount() {
    if (!this.props.recommendation.collapsed) {
      // Usually, our expansion and contraction is based on handling new props
      // in componentWillReceiveProps(), but this doesn't happen on the initial
      // render of the component.  Do it explicitely.
      this.expand();
    }
  }

  componentWillReceiveProps(nextProps) {
    // Determine if the expandable element is expanding or contracting based
    // on the incoming props. We need to do this to help our CSS transitions
    // since we can't transition to an auto height.  This issue, and the
    // approach we've taken to address it is described at length here:
    // https://css-tricks.com/using-css-transitions-auto-dimensions/
    const expanding = (
      this.props.recommendation.collapsed &&
      !nextProps.recommendation.collapsed
    );

    if (expanding) {
      this.expand();
      return;
    }

    const collapsing = (
      !this.props.recommendation.collapsed &&
      nextProps.recommendation.collapsed
    );

    if (collapsing) {
      this.collapse();
    }
  }

  /**
   * Help our CSS transition when the expandable elemet is expanding.
   */
  expand() {
    if (!this.expansionEl) {
      return;
    }

    // Get the height of the element's content independent of its actual size
    const height = this.expansionEl.scrollHeight;
    // Set the height of the element to its content's height
    this.expansionEl.style.height = `${height}px`;
    // Handle the transition we just triggered
    this.expansionEl.addEventListener('transitioned', this.onTransitioned);
  }

  collapse() {
    if (!this.expansionEl) {
      return;
    }

    // Get the height of the element's content.
    const height = this.expansionEl.scrollHeight;

    // Disable any CSS transitions temporarily
    const transition = this.expansionEl.style.transition;
    this.expansionEl.style.transition = '';

    // On the next animation frame, where we'll pick up the CSS changes we
    // just made.
    this.props.requestAnimationFrame(() => {
      // Explicitely set the height of our element so we don't transition out of
      // `auto`.
      this.expansionEl.style.height = `${height}px`;
      // And restore our transition
      this.expansionEl.style.transition = transition;

      // On the next animation frame, which will happen after we've restored
      // the height and transition, start the transition to zero height
      this.props.requestAnimationFrame(() => {
        this.expansionEl.style.height = '0px';
      });
    });
  }

  /**
   * Handle our expansion CSS transition.
   */
  onTransitioned(e) {
    // Remove this event listener so it's only run once
    e.target.removeEventListener('transitioned', this.onTransitioned);
    // Remove the explicit height so it will be restored to its actual height
    e.target.style.height = null;
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
  requestAnimationFrame: PropTypes.func,
};

export default Recommendation;
