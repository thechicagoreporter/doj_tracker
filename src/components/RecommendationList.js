import PropTypes from 'prop-types';
import React from 'react';
import Recommendation from './Recommendation';

class RecommendationList extends React.Component {
  render() {
    return (
      <div className="recommendations">
        {this.props.recommendations.map(r => (
          <Recommendation
            key={r.id}
            recommendation={r}
            onGistClick={this.props.onGistClick}
            scrollToRef={el => this.scrollToRef(el, r.id)} />
        ))}
      </div>
    );
  }

  scrollToRef(el, id) {
    if (id === this.props.detailId) {
      this.scrollToRecEl = el;
    }
  }

  componentDidMount() {
    if (this.scrollToRecEl) {
      // TODO: Scroll to this element
    }
  }
}

RecommendationList.propTypes = {
  recommendations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })),
  onGistClick: PropTypes.func,
  detailId: PropTypes.string,
};

export default RecommendationList;
