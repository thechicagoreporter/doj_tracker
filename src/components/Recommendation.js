import React from 'react';
import PropTypes from 'prop-types';
import { modifierClassNames } from '../util';
import AgencyList from './AgencyList';
import UpdateList from './UpdateList';

const getClassName = (props) => {
  const classNames = [
    'recommendation',
    `recommendation--${props.recommendation.statusSlug}`,
  ];

  if (props.recommendation.collapsed) {
    classNames.push('recommendation--collapsed');
  }

  return classNames.join(' ');
};

class Recommendation extends React.Component {
  constructor() {
    super();

    this.handleGistClick = this.handleGistClick.bind(this);
  }

  render() {
    const gistClassName = modifierClassNames(
      'recommendation__gist',
      this.props.recommendation.collapsed,
      'collapsed',
    );

    return (
      <div className={getClassName(this.props)} ref={this.props.scrollToRef}>
        <h3 className={gistClassName}>
          <a href="#" onClick={this.handleGistClick}>
            {this.props.recommendation.recommendation_gist}
          </a>
        </h3>

        <div className="recommendation__category">{this.props.recommendation.category}</div>

        <div>
          <span
            className={`recommendation__status recommendation__status--${this.props.recommendation.statusSlug}`}>

            {this.props.recommendation.status}
          </span>
        </div>

        <div className="recommendation__specific">
            {this.props.recommendation.recommendation_specific}
        </div>

        <AgencyList agencies={this.props.recommendation.agency_responsible} />

        <UpdateList updates={this.props.recommendation.updates} />
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
