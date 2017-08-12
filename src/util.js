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
      statuses: Object.assign({}, state.statuses, {
        selected: new Set(state.statuses.selected),
      }),
      search,
    },
  );
};
