import { connect } from 'react-redux';
import { toggleRecommendation } from '../actions';
import RecommendationList from '../components/RecommendationList';

const mapStateToProps = state => ({
  recommendations: state.recommendations.allIds.filter(
    id => state.recommendations.filteredIds.has(id),
  ).map(id => state.recommendations.byId[id]),
});

const mapDispatchToProps = dispatch => ({
  onGistClick: (recommendation) => {
    dispatch(toggleRecommendation(recommendation));
  },
});

const VisibleRecommendationList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecommendationList);

export default VisibleRecommendationList;
