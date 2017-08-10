import PropTypes from 'prop-types';
import React from 'react';
import Recommendation from './Recommendation';

const RecommendationList = ({
  recommendations,
  onGistClick,
}) => (
  <div className="recommendations">
    {recommendations.map(r => (
      <Recommendation
        key={r.id}
        recommendation={r}
        onGistClick={onGistClick} />
    ))}
  </div>
);

RecommendationList.propTypes = {
  recommendations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })),
  onGistClick: PropTypes.func,
};

export default RecommendationList;
