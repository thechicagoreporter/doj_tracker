import { combineReducers } from 'redux';
import { SEARCH, TOGGLE_STATUS_FILTER } from '../actions';
import * as sliceReducers from './slices';

const combinedReducer = combineReducers(sliceReducers);

const filter = function filterReducer(state, action) {
  switch (action.type) {
    case SEARCH:
    case TOGGLE_STATUS_FILTER: {
      let searchIds = state.recommendations.allIds;
      if (state.q) {
        searchIds = state.search.search(state.q).map(r => r.id);
      }

      let filteredIds;
      if (state.selectedStatuses.size) {
        filteredIds = new Set(searchIds.filter((id) => {
          const r = state.recommendations.byId[id];
          return state.selectedStatuses.has(r.status);
        }));
      } else {
        filteredIds = new Set(searchIds);
      }

      const recommendations = Object.assign({}, state.recommendations, {
        filteredIds,
      });

      return Object.assign({}, state, {
        recommendations,
      });
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
