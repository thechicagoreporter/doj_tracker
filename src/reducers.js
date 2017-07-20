import { TOGGLE_CATEGORY, TOGGLE_STATUS_FILTER } from './actions';

const initialState = {
  categories: [],
  statuses: new Set(),
};

// eslint-disable-next-line import/prefer-default-export
export const trackerApp = function trackerAppReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_CATEGORY: {
      return Object.assign({}, state, {
        categories: state.categories.map((c) => {
          if (c.slug === action.slug) {
            return Object.assign({}, c, {
              collapsed: !c.collapsed,
            });
          }

          return c;
        }),
      });
    }

    case TOGGLE_STATUS_FILTER: {
      const newStatuses = new Set(state.statuses);
      if (state.statuses.has(action.statusFilter)) {
        newStatuses.delete(action.statusFilter);
      } else {
        newStatuses.add(action.statusFilter);
      }
      return Object.assign({}, state, {
        statuses: newStatuses,
      });
    }

    default:
      return state;
  }
};
