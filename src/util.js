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
  const byId = {};
  state.recommendations.items.forEach((r) => {
    byId[r.id] = r;
  });
  return Object.assign(
    {},
    state,
    {
      recommendations: {
        items: state.recommendations.items,
        byId,
      },
      selectedStatuses: new Set(state.selectedStatuses),
    },
  );
};
