export const SEARCH = 'SEARCH';
export const TOGGLE_RECOMMENDATION = 'TOGGLE_RECOMMENDATION';
export const TOGGLE_STATUS_FILTER = 'TOGGLE_STATUS_FILTER';
export const TOGGLE_CATEGORY_FILTER = 'TOGGLE_CATEGORY_FILTER';
export const TOGGLE_FILTER_DRAWER = 'TOGGLE_FILTER_DRAWER';

export const search = function searchActionCreator(q) {
  return {
    type: SEARCH,
    q,
  };
};

export const toggleCategoryFilter = function toggleCategoryFilterActionCreator(
  filter,
  initialFilters,
  initialRender,
) {
  return {
    type: TOGGLE_CATEGORY_FILTER,
    filter,
    initialFilters,
    initialRender,
  };
};

export const toggleStatusFilter = function toggleStatusFilterActionCreator(
  filter,
  initialFilters,
  initialRender,
) {
  return {
    type: TOGGLE_STATUS_FILTER,
    filter,
    initialFilters,
    initialRender,
  };
};

export const toggleRecommendation = function toggleRecommendationActionCreator(
  r,
  detailId,
  initialRender,
) {
  return {
    type: TOGGLE_RECOMMENDATION,
    recommendation: r,
    detailId,
    initialRender,
  };
};

export const toggleFilterDrawer = function toggleFilterDrawerActionCreator() {
  return {
    type: TOGGLE_FILTER_DRAWER,
  };
};
