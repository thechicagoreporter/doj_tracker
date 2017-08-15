import { connect } from 'react-redux';
import { toggleStatusFilter } from '../actions';
import FilterSet from '../components/FilterSet';
import { getFilterClassName } from '../util';

const mapStateToProps = state => ({
  label: 'By Status',
  items: state.statuses.all,
  isSelected: status => state.statuses.selected.has(status.status),
  getClassName: getFilterClassName,
  getLabel: status => status.status,
});

const mapDispatchToProps = dispatch => ({
  onFilterClick: (status) => {
    dispatch(toggleStatusFilter(status.status));
  },
});

const SelectedStatusFilters = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterSet);

export default SelectedStatusFilters;
