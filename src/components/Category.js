import PropTypes from 'prop-types';
import React from 'react';
import { modifierClassNames } from '../util';
import Recommendation from './Recommendation';

class Category extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    const recommendations = this.props.category.recommendations
      .map(this.props.getRecommendationById)
      .filter(r => this.props.statusSelected(r.status))
      .map(r => (
        <Recommendation key={r.id}
          recommendation={r}
          category={this.props.category}
          onGistClick={this.props.onGistClick} />
      ));

    const categoryNameClassName = modifierClassNames(
      'category__name',
      this.props.category.collapsed,
      'collapsed',
    );

    return (
      <div className="category">
        <h2 className={categoryNameClassName}>
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
