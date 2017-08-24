import PropTypes from 'prop-types';
import React from 'react';
import Recommendation from './Recommendation';
import styles from './RecommendationList.css';

class RecommendationList extends React.Component {
  render() {
    return (
      <div className={styles.recommendations}>
        {this.props.recommendations.map(r => (
          <Recommendation
            key={r.id}
            recommendation={r}
            onToggleRecommendation={
              rec => this.props.onToggleRecommendation(
                rec,
                this.props.initialRender,
              )
            }
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
      // HACK: This doesn't work in Chrome without the setTimeout
      setTimeout(() => {
        this.scrollToRecEl.scrollIntoView(true);
      }, 1);
    }
  }
}

RecommendationList.propTypes = {
  recommendations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })),
  onToggleRecommendation: PropTypes.func,
  detailId: PropTypes.string,
  initialRender: PropTypes.bool,
};

export default RecommendationList;
