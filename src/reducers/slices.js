import {
  SEARCH,
  TOGGLE_STATUS_FILTER,
  TOGGLE_RECOMMENDATION,
} from '../actions';

export const statuses = function selectedStatusesReducer(state = []) {
  return state;
};

export const title = function titleReducer(state = 'DOJ Tracker') {
  return state;
};

export const search = function searchReducer(state = {}) {
  return state;
};

export const q = function qReducer(state = null, action) {
  switch (action.type) {
    case SEARCH: {
      return action.q;
    }

    default:
      return state;
  }
};

// eslint-disable-next-line camelcase
export const intro_text = function introTextReducer(state = '') {
  return state;
};

export const selectedStatuses = function selectedStatusesReducer(
  state = new Set(),
  action,
) {
  switch (action.type) {
    case TOGGLE_STATUS_FILTER: {
      const newSelectedStatuses = new Set(state);
      if (state.has(action.statusFilter)) {
        newSelectedStatuses.delete(action.statusFilter);
      } else {
        newSelectedStatuses.add(action.statusFilter);
      }

      return newSelectedStatuses;
    }

    default:
      return state;
  }
};

export const recommendations = function recommendationsReducer(
  state = { allIds: [], byId: {} },
  action,
) {
  switch (action.type) {
    case TOGGLE_RECOMMENDATION: {
      const id = action.recommendation.id;
      const recommendation = state.byId[id];

      return Object.assign({}, state, {
        byId: Object.assign({}, state.byId, {
          [id]: Object.assign({}, recommendation, {
            collapsed: !recommendation.collapsed,
          }),
        }),
      });
    }

    default:
      return state;
  }
};
