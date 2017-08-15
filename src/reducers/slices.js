import {
  SEARCH,
  TOGGLE_CATEGORY_FILTER,
  TOGGLE_STATUS_FILTER,
  TOGGLE_RECOMMENDATION,
} from '../actions';

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

export const categories = function categoriesReducer(
  state = { all: [], selected: [] },
  action,
) {
  switch (action.type) {
    case TOGGLE_CATEGORY_FILTER: {
      const newSelectedCategories = new Set(state.selected);
      if (state.selected.has(action.filter)) {
        newSelectedCategories.delete(action.filter);
      } else {
        newSelectedCategories.add(action.filter);
      }

      return Object.assign({}, state, {
        selected: newSelectedCategories,
      });
    }

    default:
      return state;
  }
};

export const statuses = function statusesReducer(
  state = { all: [], selected: [] },
  action,
) {
  switch (action.type) {
    case TOGGLE_STATUS_FILTER: {
      const newSelectedStatuses = new Set(state.selected);
      if (state.selected.has(action.filter)) {
        newSelectedStatuses.delete(action.filter);
      } else {
        newSelectedStatuses.add(action.filter);
      }

      return Object.assign({}, state, {
        selected: newSelectedStatuses,
      });
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
