import { connect } from 'react-redux';
import { toggleCategoryFilter } from '../actions';
import FilterSet from '../components/FilterSet';
import { getFilterClassName } from '../util';

const mapStateToProps = state => ({
  items: state.categories.all,
  isSelected: category => state.categories.selected.has(category.category),
  getClassName: getFilterClassName,
  getLabel: category => category.category,
});

const mapDispatchToProps = dispatch => ({
  onFilterClick: (category) => {
    dispatch(toggleCategoryFilter(category.category));
  },
});

const SelectedCategoryFilters = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterSet);

export default SelectedCategoryFilters;
