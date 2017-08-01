// eslint-disable-next-line import/prefer-default-export
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
