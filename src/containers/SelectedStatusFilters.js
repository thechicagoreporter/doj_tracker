import { connect } from 'react-redux';
import { toggleStatusFilter } from '../actions';
import StatusFilters from '../components/StatusFilters';

const mapStateToProps = state => ({
  statuses: state.statuses,
  statusSelected: status => state.selectedStatuses.has(status),
});

const mapDispatchToProps = dispatch => ({
  onFilterClick: (status) => {
    dispatch(toggleStatusFilter(status));
  },
});

const SelectedStatusFilters = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StatusFilters);

export default SelectedStatusFilters;
