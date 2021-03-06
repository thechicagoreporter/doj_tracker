import {
  SEARCH,
  SET_ORDER_BY,
  TOGGLE_AGENCY_FILTER,
  TOGGLE_CATEGORY_FILTER,
  TOGGLE_INTRO,
  TOGGLE_FILTER_DRAWER,
  TOGGLE_STATUS_FILTER,
  TOGGLE_RECOMMENDATION,
} from '../actions';
import { DESC, LAST_UPDATED } from '../constants';

const identityReducer = initialState => (state = initialState) => state;

export const title = function titleReducer(state = 'DOJ Tracker') {
  return state;
};

export const search = identityReducer({});

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
export const introText = identityReducer('');

export const agencies = function agenciesReducer(
  state = { all: [], selected: [] },
  action,
) {
  switch (action.type) {
    case TOGGLE_AGENCY_FILTER: {
      const newSelectedAgencies = new Set(state.selected);
      if (state.selected.has(action.filter)) {
        newSelectedAgencies.delete(action.filter);
      } else if (action.initialRender &&
                 (action.filter === action.initialFilter)) {
        // This is the first time we're handling this action, there is
        // an initial filter set from a router parameter and it matches
        // the filter that is being toggled.
        // Since it will not be in the set of selected filters (because
        // it was set from a route parameter) we can't remove it. But we
        // want to make sure we don't add it.  So, do nothing.
      } else {
        newSelectedAgencies.add(action.filter);
      }

      return {
        ...state,
        selected: newSelectedAgencies,
      };
    }

    default:
      return state;
  }
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
      } else if (action.initialRender &&
                 (action.filter === action.initialFilter)) {
        // This is the first time we're handling this action, there is
        // an initial filter set from a router parameter and it matches
        // the filter that is being toggled.
        // Since it will not be in the set of selected filters (because
        // it was set from a route parameter) we can't remove it. But we
        // want to make sure we don't add it.  So, do nothing.
      } else {
        newSelectedCategories.add(action.filter);
      }

      return {
        ...state,
        selected: newSelectedCategories,
      };
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
      } else if (action.initialRender &&
                 (action.initialFilters.statuses.has(action.filter))) {
        // This is the first time we're handling this action, there is
        // an initial filter set from a router parameter and it matches
        // the filter that is being toggled.
        // Since it will not be in the set of selected filters (because
        // it was set from a route parameter) we can't remove it. But we
        // want to make sure we don't add it.  So, do nothing.
      } else {
        newSelectedStatuses.add(action.filter);
      }

      return {
        ...state,
        selected: newSelectedStatuses,
      };
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
      const collapsed = action.initialRender && action.detailId === id ?
        true :
        !recommendation.collapsed;

      return {
        ...state,
        byId: {
          ...state.byId,
          [id]: {
            ...recommendation,
            collapsed,
          },
        },
      };
    }

    default:
      return state;
  }
};

export const initialRender = identityReducer(true);

export const filterDrawerCollapsed = function filterDrawerCollapsedReducer(
  state = true,
  action,
) {
  switch (action.type) {
    case TOGGLE_FILTER_DRAWER: {
      return !state;
    }

    default:
      return state;
  }
};

/**
 * Reducer for the `orderBy` property of state.
 */
export const orderBy = function orderByReducer(
  state = { orderBy: LAST_UPDATED, direction: DESC },
  action,
) {
  switch (action.type) {
    case SET_ORDER_BY: {
      return {
        orderBy: action.orderBy,
        direction: action.direction,
      };
    }

    default:
      return state;
  }
};

export const lede = identityReducer('');

export const chartCaption = identityReducer('');

export const chartTitle = identityReducer('');

export const introCollapsed = function introCollapsedReducer(
  state = true,
  action,
) {
  switch (action.type) {
    case TOGGLE_INTRO: {
      return !state;
    }

    default:
      return state;
  }
};

export const credits = identityReducer('');

export const methodology = identityReducer('');

export const shareEmailSubject = identityReducer('');

export const shareEmailBody = identityReducer('');

export const shareTweetText = identityReducer('');
