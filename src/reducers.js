import { TOGGLE_CATEGORY, TOGGLE_STATUS_FILTER, TOGGLE_RECOMMENDATION } from './actions';

export const categories = function categoriesReducer(
  state = { items: [], byName: {} },
  action,
) {
  switch (action.type) {
    case TOGGLE_CATEGORY: {
      const cats = {
        items: [],
        byName: {},
      };
      state.items.forEach((c) => {
        let updated = c;
        if (c.slug === action.slug) {
          updated = Object.assign({}, c, {
            collapsed: !c.collapsed,
          });
        }

        cats.items.push(updated);
        cats.byName[updated.name] = updated;
      });
      return cats;
    }

    default:
      return state;
  }
};

export const statuses = function selectedStatusesReducer(state = []) {
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
  state = { items: [], byId: {} },
  action,
) {
  switch (action.type) {
    case TOGGLE_RECOMMENDATION: {
      const recs = {
        items: [],
        byId: {},
      };

      state.items.forEach((r) => {
        let updated = r;
        if (r.id === action.recommendation.id) {
          updated = Object.assign({}, r, {
            collapsed: !r.collapsed,
          });
        }

        recs.items.push(updated);
        recs.byId[updated.id] = updated;
      });

      return recs;
    }

    default:
      return state;
  }
};
