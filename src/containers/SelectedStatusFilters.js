import { connect } from 'react-redux';
import { toggleStatusFilter } from '../actions';
import FilterSet from '../components/FilterSet';
import { getFilterClassName } from '../util';

const mapStateToProps = (state, ownProps) => ({
  label: 'Filter By Status',
  items: state.statuses.all,
  isSelected: status => (
    state.statuses.selected.has(status.status) ||
    (state.initialRender &&
     ownProps.initialFilters.statuses.has(status.status))
  ),
  getClassName: getFilterClassName,
  getLabel: status => status.status,
  initialRender: state.initialRender,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onFilterClick: (status, initialRender = false) => {
    dispatch(toggleStatusFilter(
      status.status,
      ownProps.initialFilters,
      initialRender,
    ));
  },
});

const SelectedStatusFilters = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterSet);

export default SelectedStatusFilters;
