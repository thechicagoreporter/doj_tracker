import { TOGGLE_CATEGORY, TOGGLE_STATUS_FILTER, TOGGLE_RECOMMENDATION } from './actions';

const initialState = {
  categories: [],
  statuses: new Set(),
};

// eslint-disable-next-line import/prefer-default-export
export const trackerApp = function trackerAppReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_CATEGORY: {
      const categories = [];
      const categoryLookup = {};
      state.categories.forEach((c) => {
        let updated = c;
        if (c.slug === action.slug) {
          updated = Object.assign({}, c, {
            collapsed: !c.collapsed,
          });
        }

        categories.push(updated);
        categoryLookup[updated.name] = updated;
      });
      return Object.assign({}, state, {
        categories,
        categoryLookup,
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

    case TOGGLE_RECOMMENDATION: {
      const recommendations = state.recommendations.map((r) => {
        if (r.id === action.recommendation.id) {
          return Object.assign({}, r, {
            collapsed: !r.collapsed,
          });
        }

        return r;
      });
      const recommendationsLookup = {};

      recommendations.forEach((r) => {
        recommendationsLookup[r.id] = r;
      });

      return Object.assign({}, state, {
        recommendations,
        recommendationsLookup,
      });
    }

    default:
      return state;
  }
};
