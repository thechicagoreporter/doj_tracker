import classNames from 'classnames/bind';
import { Search } from 'js-search';
import filterStyles from './components/Filter.css';

/**
 * Convert initial state deserialized from JSON to a more useable form.
 */
export const hydrateState = (state) => {
  const filteredIds = new Set();
  const search = new Search('id');
  search.addIndex('recommendation_gist');

  // Add all recommendations to the set of filtered IDs since we show all
  // recommendations initially.
  // Add all recommendations to the search index.
  state.recommendations.allIds.forEach((id) => {
    const r = state.recommendations.byId[id];
    filteredIds.add(r.id);
    search.addDocument(r);
  });

  return {
    ...state,
    // Add the set of filtered IDs to the recommendations collection
    recommendations: {
      ...state.recommendations,
      filteredIds,
    },
    // Convert `selected` properties from arrays to `Set` objects.
    agencies: {
      ...state.agencies,
      selected: new Set(state.agencies.selected),
    },
    categories: {
      ...state.categories,
      selected: new Set(state.categories.selected),
    },
    statuses: {
      ...state.statuses,
      selected: new Set(state.statuses.selected),
    },
    search,
  };
};

export const camelCase = (status, sep = ' ') => {
  const bits = status.split(sep).map((bit) => {
    const firstC = bit.charAt(0).toUpperCase();
    const rest = bit.substr(1).toLowerCase();
    return `${firstC}${rest}`;
  });
  bits[0] = bits[0].toLowerCase();

  return bits.join('');
};

export const getFilterClassName = (category, selected) => {
  const cx = classNames.bind(filterStyles);
  return cx({
    filter: !selected,
    [camelCase(category.slug, '-')]: true,
    filterSelected: selected,
  });
};

export const toTitleCase = s => s.replace(/\w\S*/g, txt => (
  txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
));

export const unslugify = slug => (
  slug ? slug.split('-').map((bit) => {
    if (bit === 'and' || bit === 'or') {
      return bit;
    }

    return toTitleCase(bit);
  }).join(' ') : slug
);

export const getHtml = text => ({
  __html: text,
});

/**
 * Returns the union of two sets.
 */
export const union = (s1, s2) => {
  const newSet = new Set(s1);
  s2.forEach((elem) => {
    newSet.add(elem);
  });
  return newSet;
};
