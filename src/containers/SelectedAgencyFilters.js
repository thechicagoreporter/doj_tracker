import { connect } from 'react-redux';
import { toggleAgencyFilter } from '../actions';
import FilterSet from '../components/FilterSet';
import { getFilterClassName } from '../util';

const mapStateToProps = (state, ownProps) => ({
  label: 'By Agency',
  items: state.agencies.all,
  isSelected: agency => (
    state.agencies.selected.has(agency.agency) ||
    (state.initialRender &&
     ownProps.initialFilters.agencies.has(agency.agency))
  ),
  getClassName: getFilterClassName,
  getLabel: agency => agency.agency,
  initialRender: state.initialRender,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onFilterClick: (agency, initialRender) => {
    dispatch(toggleAgencyFilter(
      agency.agency,
      ownProps.initialFilters,
      initialRender,
    ));
  },
});

const SelectedAgencyFilters = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterSet);

export default SelectedAgencyFilters;
