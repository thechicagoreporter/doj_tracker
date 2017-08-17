/**
 * Reducers that operate on multiple pieces of state.
 */
import { combineReducers } from 'redux';
import {
  SEARCH,
  TOGGLE_CATEGORY_FILTER,
  TOGGLE_STATUS_FILTER,
  TOGGLE_RECOMMENDATION,
} from '../actions';
import * as sliceReducers from './slices';

// Combine the reducers that reduce a particular piece of state
const combinedReducer = combineReducers(sliceReducers);

/**
 * Add initial filters to state.
 *
 * Add initial filters, likely from URL router params, to the set of
 * selected filters.
 *
 * @param {Object} state - Redux state.
 * @param {string} name - Collection to exclude when adding filters.
 * @param {Object} initialFilters - Object where each value is a set of filter
 *   values. These will be added to the `selected` property of the
 *   corresponding collection in the state.
 * @returns {Object} Updated state.
 */
const addInitialFilters = (state, exclude, initialFilters) => {
  // We only care to do this on the initial render
  if (!state.initialRender) {
    return state;
  }

  // Copy, don't modify previous state
  const newState = {
    ...state,
  };

  Object.keys(initialFilters).forEach((k) => {
    // Don't add initial filters for the excluded collection
    if (k === exclude) {
      return;
    }

    const filters = initialFilters[k];
    if (!filters.size) {
      // We don't have any initial filters for this collection.
      // Skip it.
      return;
    }

    const newSelected = new Set(state[k].selected);
    // Add each of the initial filter values to the selected set.
    filters.forEach((f) => {
      newSelected.add(f);
    });

    // Update the collection in the state
    newState[k] = {
      ...state[k],
      selected: newSelected,
    };
  });

  return newState;
};

/**
 * Reducer that adds initial filters for other filter sets.
 *
 * This is needed because we have a weird situation where we are showing
 * filter buttons as being selected, and filtering the recommendation list
 * based on two things: state and URL router parameters.
 *
 * Furthermore, we want to allow users to override the initial filters set
 * from the URL parameters to explore the recommendations.
 *
 * To achieve this, we need to make sure that when a user selects filters
 * in a set not initialized by route parameters, that the router parameter
 * filters aren't clobbered.
 */
const crossFilters = (state, action) => {
  switch (action.type) {
    case TOGGLE_CATEGORY_FILTER:
      return addInitialFilters(state, 'categories', action.initialFilters);
    case TOGGLE_STATUS_FILTER:
      return addInitialFilters(state, 'statuses', action.initialFilters);
    default:
      return state;
  }
};

/**
 * Reducer that turns off the initialRender property.
 *
 * This feels like such a hack, but it follows from the behavior of setting
 * initial filter values from URL router parameters.
 *
 * We need a flag to specify the initial state of the app, when URL-based
 * filters should be honored vs. any other state, where user clicking on
 * filter buttons configures the filter state.
 *
 * This reducer immediately turns off the flag after any user interaction.
 *
 */
const noInitialRender = (state, action) => {
  switch (action.type) {
    case TOGGLE_CATEGORY_FILTER:
    case TOGGLE_STATUS_FILTER:
    case SEARCH:
    case TOGGLE_RECOMMENDATION:
      return {
        ...state,
        initialRender: false,
      };

    default:
      return state;
  }
};

// Combine our reducers in a specific order
// eslint-disable-next-line import/prefer-default-export
export const root = (state, action) => noInitialRender(
  crossFilters(combinedReducer(state, action), action),
  action,
);
