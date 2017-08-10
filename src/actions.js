export const SEARCH = 'SEARCH';
export const TOGGLE_RECOMMENDATION = 'TOGGLE_RECOMMENDATION';
export const TOGGLE_STATUS_FILTER = 'TOGGLE_STATUS_FILTER';

export const search = function searchActionCreator(q) {
  return {
    type: SEARCH,
    q,
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
