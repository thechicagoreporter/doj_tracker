import PropTypes from 'prop-types';
import React from 'react';
import Recommendation from './Recommendation';
import RecommendationCount from './RecommendationCount';
import styles from './RecommendationList.css';

/**
 * A list of recommendation cards.
 */
class RecommendationList extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <RecommendationCount visible={this.props.recommendations.length}
          total={this.props.totalRecommendations} />

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
              scrollToRef={el => this.scrollToRef(el, r.id)}
              requestAnimationFrame={this.props.requestAnimationFrame} />
          ))}
        </div>
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
  /**
   * Array of recommendation objects to be displayed.
   *
   * Filtering should be handled outside this component.
   */
  recommendations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })),
  /**
   * Total number of recommendations.
   */
  totalRecommendations: PropTypes.number,
  /**
   * Handler for when a user toogles the collapsed state of the recommendation
   * card.
   */
  onToggleRecommendation: PropTypes.func,
  /**
   * The id of the recommendation that should be expanded, scrolled to.
   */
  detailId: PropTypes.string,
  /**
   * Set to true if this is the first time the component is being rendered.
   */
  initialRender: PropTypes.bool,
  /**
   * Function for scheduling a callback when the next animation frame occurs.
   *
   * TODO: Better explaination of this.
   *
   * This would just be `window.requestAnimationFrame()`, but we pass it in as
   * a prop to make it easier to mock/test.
   */
  requestAnimationFrame: PropTypes.func,
};

export default RecommendationList;
