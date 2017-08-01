import PropTypes from 'prop-types';
import React from 'react';
import Category from './Category';

const CategoryList = ({
  categories,
  onCategoryClick,
  onGistClick,
  getRecommendationById,
  statusSelected,
}) => (
  <div className="categories">
    {categories.map(category => (
      <Category category={category}
        key={category.slug}
        onCategoryClick={onCategoryClick}
        onGistClick={onGistClick}
        getRecommendationById={getRecommendationById}
        statusSelected={statusSelected} />
    ))}
  </div>
);

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    slug: PropTypes.string,
  })),
  getRecommendationById: PropTypes.func,
  onGistClick: PropTypes.func,
  onCategoryClick: PropTypes.func,
  statusSelected: PropTypes.func,
};

export default CategoryList;
