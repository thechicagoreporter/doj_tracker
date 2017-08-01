import PropTypes from 'prop-types';
import React from 'react';
import Recommendation from './Recommendation';

const getCategoryNameClassName = (category) => {
  const classes = ['category__name'];
  if (category.collapsed) {
    classes.push('category__name--collapsed');
  }
  return classes.join(' ');
};

class Category extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    let recommendations = [];

    if (!this.props.category.collapsed) {
      recommendations = this.props.category.recommendations
        .map(this.props.getRecommendationById)
        .filter(r => this.props.statusSelected(r.status))
        .map(r => (
          <Recommendation key={r.id}
            recommendation={r}
            onGistClick={this.props.onGistClick} />
        ));
    }

    return (
      <div className="category">
        <h2 className={getCategoryNameClassName(this.props.category)}>
          <a href="#" onClick={this.handleClick}>{this.props.category.name}</a>
        </h2>

        {recommendations}
      </div>
    );
  }

  handleClick(evt) {
    evt.preventDefault();
    this.props.onCategoryClick(this.props.category.slug);
  }
}

Category.propTypes = {
  category: PropTypes.shape({
    collapsed: PropTypes.bool,
    name: PropTypes.string,
    recommendations: PropTypes.arrayOf(PropTypes.string),
    slug: PropTypes.string,
  }),
  getRecommendationById: PropTypes.func,
  onGistClick: PropTypes.func,
  onCategoryClick: PropTypes.func,
  statusSelected: PropTypes.func,
};

export default Category;
