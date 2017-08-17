import { connect } from 'react-redux';
import { toggleCategoryFilter } from '../actions';
import FilterSet from '../components/FilterSet';
import { getFilterClassName } from '../util';

const mapStateToProps = (state, ownProps) => ({
  label: 'By Category',
  items: state.categories.all,
  isSelected: category => (
    state.categories.selected.has(category.category) ||
    (state.initialRender &&
     ownProps.initialFilters.categories.has(category.category))
  ),
  getClassName: getFilterClassName,
  getLabel: category => category.category,
  initialRender: state.initialRender,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onFilterClick: (category, initialRender) => {
    dispatch(toggleCategoryFilter(
      category.category,
      ownProps.initialFilters,
      initialRender,
    ));
  },
});

const SelectedCategoryFilters = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterSet);

export default SelectedCategoryFilters;
