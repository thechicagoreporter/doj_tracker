import { connect } from 'react-redux';
import { toggleRecommendation } from '../actions';
import RecommendationList from '../components/RecommendationList';
import { DESC, IMPORTANCE, LAST_UPDATED } from '../constants';

/**
 * Filter recommendation ids based on status, category
 *
 * @param {string[]} ids - Recommendation ids to be filtered
 * @param {Object[]} selectedFilters - Selected filter values
 * @param {Set} selectedFilters[].selected - Set of selected filter values
 * @param {function(Object): string} selectedFilters.getValues - Function
 *   that returns the filter value from a given recommendation
 * @returns {string[]} Filtered recommendation ids
 */
const applyFilters = (ids, selectedFilters, getRecommendation) => (
  ids.filter((id) => {
    const r = getRecommendation(id);
    return selectedFilters.reduce((isSelected, selected) => {
      if (selected.selected.size) {
        return isSelected && selected.getValues(r).some(
          v => selected.selected.has(v),
        );
      }

      return isSelected;
    }, true);
  })
);

/**
 * Comparison functions for recommendations.
 *
 * The properties correspond to properties in a recommendation object.
 *
 * The values are functions that can be passed to Array.sort().
 */
const sorters = {
  /**
   * Compare two recommendations by last updated date.
   */
  [LAST_UPDATED]: (a, b) => {
    if (a.lastUpdated < b.lastUpdated) {
      return -1;
    }

    if (a.lastUpdated > b.lastUpdated) {
      return 1;
    }

    return a.id - b.id;
  },

  /**
   * Compare two recommedations by importance.
   */
  [IMPORTANCE]: (a, b) => (
    a.importance - b.importance ||
    a.id - b.id
  ),
};

/**
 * Return a function that reverses the order of another sorter.
 *
 * @param {function} f - sorting function.
 * @returns Function that reverses the value returned by f.
 */
const descSorter = f => (a, b) => -1 * f(a, b);

/**
 * Convert Redux state to props for a component.
 *
 * See http://redux.js.org/docs/basics/UsageWithReact.html#implementing-container-components
 *
 * @param {object} state - Redux state.
 * @param {object} ownProps - Props passed to the component directly.
 */
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

  const selectedAgencies = state.initialRender && ownProps.initialAgency ?
    (new Set(state.agencies.selected)).add(ownProps.initialAgency) :
    state.agencies.selected;

  const selectedFilters = [
    {
      selected: selectedStatuses,
      getValues: r => [r.status],
    },
    {
      selected: selectedCategories,
      getValues: r => [r.category],
    },
    {
      selected: selectedAgencies,
      getValues: r => r.agency_responsible,
    },
  ];
  const filteredIds = applyFilters(
    searchIds,
    selectedFilters,
    id => state.recommendations.byId[id],
  );

  let sorter = sorters[state.orderBy.orderBy];
  if (state.orderBy.direction === DESC) {
    sorter = descSorter(sorter);
  }

  // Get a list of recommendations with the filters applied
  const recommendations = filteredIds.map((id) => {
    // Retrieve the full recommendation object for an ID
    const r = state.recommendations.byId[id];

    // If an id has been specified in the route and it matches
    // this particular recommendation, make sure it's expanded.
    if (state.initialRender && ownProps.detailId &&
        r.id === ownProps.detailId) {
      return {
        ...r,
        collapsed: false,
      };
    }

    return r;
  }).sort(sorter);

  return {
    recommendations,
    detailId: ownProps.detailId,
    initialRender: state.initialRender,
  };
};

/**
 * Return callback props to be injected into the presentational component.
 *
 * See http://redux.js.org/docs/basics/UsageWithReact.html#implementing-container-components
 *
 * @param {function} dispatch - Redux state dispatch method.
 * @param {object} ownProps - Props passed directly to component.
 *
 * @returns {object} Props to be passed to the presentational component.
 */
const mapDispatchToProps = (dispatch, ownProps) => ({
  onToggleRecommendation: (recommendation, initialRender) => {
    dispatch(toggleRecommendation(
      recommendation,
      ownProps.detailId,
      initialRender,
    ));
  },
});

const VisibleRecommendationList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecommendationList);

export default VisibleRecommendationList;
