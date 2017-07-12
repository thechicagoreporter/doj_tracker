import { TOGGLE_CATEGORY } from './actions';

const initialState = {
  categories: [],
};

export const trackerApp = function trackerAppReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_CATEGORY:
      return Object.assign({}, state, {
        categories: state.categories.map((c) => {
          if (c.slug == action.slug) {
            return Object.assign({}, c, {
              collapsed: !c.collapsed,
            });
          }

          return c;
        }),
      });


    default:
      return state
  }
};
