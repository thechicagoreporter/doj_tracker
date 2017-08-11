import { connect } from 'react-redux';
import { toggleStatusFilter } from '../actions';
import FilterSet from '../components/FilterSet';

const getClassName = (status, selected) => {
  const classes = [
    'status-filter',
    `status-filter--${status.slug}`,
  ];

  if (selected) {
    classes.push('status-filter--selected');
  }

  return classes.join(' ');
};

const mapStateToProps = state => ({
  items: state.statuses,
  isSelected: status => state.selectedStatuses.has(status.status),
  getClassName,
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
