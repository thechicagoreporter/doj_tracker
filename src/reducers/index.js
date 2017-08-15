import { combineReducers } from 'redux';
import {
  SEARCH,
  TOGGLE_STATUS_FILTER,
  TOGGLE_CATEGORY_FILTER,
} from '../actions';
import * as sliceReducers from './slices';

const combinedReducer = combineReducers(sliceReducers);

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
  new Set(ids.filter((id) => {
    const r = getRecommendation(id);
    return selectedFilters.reduce((isSelected, selected) => {
      if (selected.selected.size) {
        return isSelected && selected.selected.has(selected.getValue(r));
      }

      return isSelected;
    }, true);
  }))
);

const filter = function filterReducer(state, action) {
  switch (action.type) {
    case SEARCH:
    case TOGGLE_STATUS_FILTER:
    case TOGGLE_CATEGORY_FILTER: {
      let searchIds = state.recommendations.allIds;
      if (state.q) {
        searchIds = state.search.search(state.q).map(r => r.id);
      }

      // Build a list of selected filter values and getter functions
      // to retrieve the corresponding value from the recommendation
      // object.
      const selectedFilters = [
        {
          selected: state.statuses.selected,
          getValue: r => r.status,
        },
        {
          selected: state.categories.selected,
          getValue: r => r.category,
        },
      ];
      const filteredIds = applyFilters(
        searchIds,
        selectedFilters,
        id => state.recommendations.byId[id],
      );

      return {
        ...state,
        recommendations: {
          ...state.recommendations,
          filteredIds,
        },
      };
    }

    default:
      return state;
  }
};

// eslint-disable-next-line import/prefer-default-export
export const root = function rootReducer(state, action) {
  const intermediateState = combinedReducer(state, action);
  return filter(intermediateState, action);
};
