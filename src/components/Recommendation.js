import React from 'react';
import PropTypes from 'prop-types';
import AgencyList from './AgencyList';
import UpdateList from './UpdateList';

const getGistClassName = (recommendation) => {
  const classes = ['recommendation__gist'];

  if (recommendation.collapsed) {
    classes.push('recommendation__gist--collapsed');
  }

  return classes.join(' ');
};

class Recommendation extends React.Component {
  constructor() {
    super();

    this.handleGistClick = this.handleGistClick.bind(this);
  }

  render() {
    const children = [(
      <h3 key="gist" className={getGistClassName(this.props.recommendation)}>
        <a href="#" onClick={this.handleGistClick}>
          {this.props.recommendation.recommendation_gist}
        </a>
      </h3>
    )];

    if (!this.props.recommendation.collapsed) {
      children.push((
        <div key="status">
          <span
            className={`recommendation__status recommendation__status--${this.props.recommendation.statusSlug}`}>

            {this.props.recommendation.status}
          </span>
        </div>
      ));
      children.push(
        <div key="specific" className="recommendation__specific">
            {this.props.recommendation.recommendation_specific}
        </div>,
      );
      children.push(
        <AgencyList key="agencies" agencies={this.props.recommendation.agency_responsible} />,
      );
      children.push(
        <UpdateList key="updates" updates={this.props.recommendation.updates} />,
      );
    }

    return (
      <div className={`recommendation recommendation--${this.props.recommendation.statusSlug}`}>
        {children}
      </div>
    );
  }

  handleGistClick(evt) {
    evt.preventDefault();
    this.props.onGistClick(this.props.recommendation);
  }
}

Recommendation.propTypes = {
  onGistClick: PropTypes.func,
  recommendation: PropTypes.shape({
    agency_responsible: PropTypes.arrayOf(PropTypes.string),
    collapsed: PropTypes.bool,
    id: PropTypes.string,
    recommendation_specific: PropTypes.string,
    recommendation_gist: PropTypes.string,
    status: PropTypes.string,
    statusSlug: PropTypes.string,
    updates: PropTypes.arrayOf(PropTypes.object),
  }),
};

export default Recommendation;
