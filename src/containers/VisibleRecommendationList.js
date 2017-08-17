import { connect } from 'react-redux';
import { toggleRecommendation } from '../actions';
import RecommendationList from '../components/RecommendationList';

/**
 * Filter recommendation ids based on status, category
 *
 * @param {string[]} ids - Recommendation ids to be filtered
 * @param {Object[]} selectedFilters - Selected filter values
 * @param {Set} selectedFilters[].selected - Set of selected filter values
 * @param {function(Object): string} selectedFilters.getValue - Function
 *   that returns the filter value from a given recommendation
 * @returns {string[]} Filtered recommendation ids
 */
const applyFilters = (ids, selectedFilters, getRecommendation) => (
  ids.filter((id) => {
    const r = getRecommendation(id);
    return selectedFilters.reduce((isSelected, selected) => {
      if (selected.selected.size) {
        return isSelected && selected.selected.has(selected.getValue(r));
      }

      return isSelected;
    }, true);
  })
);

const mapStateToProps = (state, ownProps) => {
  // If a query is specified, get a list of recommendation IDs that match
  // the query.  Otherwise, get IDs for all recommendations.
  const searchIds = state.q ?
    state.search.search(state.q).map(r => r.id) :
    state.recommendations.allIds;

  // Build a list of selected filter values and getter functions
  // to retrieve the corresponding value from the recommendation
  // object.
  const selectedStatuses = state.initialRender && ownProps.initialStatus ?
    (new Set(state.statuses.selected)).add(ownProps.initialStatus) :
    state.statuses.selected;

  const selectedCategories = state.initialRender && ownProps.initialCategory ?
    (new Set(state.categories.selected)).add(ownProps.initialCategory) :
    state.categories.selected;

  const selectedFilters = [
    {
      selected: selectedStatuses,
      getValue: r => r.status,
    },
    {
      selected: selectedCategories,
      getValue: r => r.category,
    },
  ];
  const filteredIds = applyFilters(
    searchIds,
    selectedFilters,
    id => state.recommendations.byId[id],
  );

  // Get a list of recommendations with the filters applied
  const recommendations = filteredIds.map((id) => {
    // Retrieve the full recommendation object for an ID
    const r = state.recommendations.byId[id];

    // If an id has been specified in the route and it matches
    // this particular recommendation, make sure it's expanded.
    if (ownProps.id && r.id === ownProps.id) {
      return {
        ...r,
        collapsed: false,
      };
    }

    return r;
  });

  return {
    recommendations,
    detailId: ownProps.id,
  };
};

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
