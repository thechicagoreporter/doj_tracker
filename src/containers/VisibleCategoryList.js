import { connect } from 'react-redux';
import { toggleCategory, toggleRecommendation } from '../actions';
import CategoryList from '../components/CategoryList';

const mapStateToProps = state => ({
  categories: state.categories,
  getRecommendationById: id => state.recommendations.byId[id],
  statusSelected: status => state.selectedStatuses.has(status),
});

const mapDispatchToProps = dispatch => ({
  onCategoryClick: (slug) => {
    dispatch(toggleCategory(slug));
  },
  onGistClick: (recommendation) => {
    dispatch(toggleRecommendation(recommendation));
  },
});

const VisibleCategoryList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryList);

export default VisibleCategoryList;
