import { Search } from 'js-search';

export const modifierClassNames = (
  className,
  condition,
  trueModifier,
  falseModifier,
) => {
  const classNames = [className];

  if (condition) {
    classNames.push(`${className}--${trueModifier}`);
  } else if (falseModifier) {
    classNames.push(`${className}--${falseModifier}`);
  }

  return classNames.join(' ');
};

export const hydrateState = (state) => {
  const filteredIds = new Set();
  const search = new Search('id');
  search.addIndex('recommendation_gist');

  state.recommendations.allIds.forEach((id) => {
    const r = state.recommendations.byId[id];
    filteredIds.add(r.id);
    search.addDocument(r);
  });

  return Object.assign(
    {},
    state,
    {
      recommendations: Object.assign({}, state.recommendations, {
        filteredIds,
      }),
      categories: Object.assign({}, state.categories, {
        selected: new Set(state.categories.selected),
      }),
      statuses: Object.assign({}, state.statuses, {
        selected: new Set(state.statuses.selected),
      }),
      search,
    },
  );
};

export const getFilterClassName = (category, selected) => {
  const classes = [
    'filter',
    `filter--${category.slug}`,
  ];

  if (selected) {
    classes.push('filter--selected');
  }

  return classes.join(' ');
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
