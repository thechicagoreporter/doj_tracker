export const TOGGLE_CATEGORY = 'TOGGLE_CATEGORY';
export const TOGGLE_RECOMMENDATION = 'TOGGLE_RECOMMENDATION';
export const TOGGLE_STATUS_FILTER = 'TOGGLE_STATUS_FILTER';

export const toggleCategory = function toggleCategoryActionCreator(slug) {
  return {
    type: TOGGLE_CATEGORY,
    slug,
  };
};

export const toggleStatusFilter = function toggleStatusFilterActionCreator(statusFilter) {
  return {
    type: TOGGLE_STATUS_FILTER,
    statusFilter,
  };
};

export const toggleRecommendation = function toggleRecommendationActionCreator(r) {
  return {
    type: TOGGLE_RECOMMENDATION,
    recommendation: r,
  };
};
