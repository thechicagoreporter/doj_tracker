export const TOGGLE_CATEGORY = "TOGGLE_CATEGORY";

export const toggleCategory = function toggleCategoryActionCreator(slug) {
  return {
    type: TOGGLE_CATEGORY,
    slug,
  };
};
