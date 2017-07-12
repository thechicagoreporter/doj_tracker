export const TOGGLE_CATEGORY = "TOGGLE_CATEGORY";
export const FILTER_STATUS = "FILTER_STATUS";

export const toggleCategory = function toggleCategoryActionCreator(slug) {
  return {
    type: TOGGLE_CATEGORY,
    slug,
  };
};

export const filterStatus = function filterStatusActionCreator(statusFilter) {
  return {
    type: FILTER_STATUS,
    statusFilter,
  };
};
