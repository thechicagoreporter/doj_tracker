import React from 'react';
import { connect } from 'react-redux';
import { toggleFilterDrawer } from '../actions';
import FilterDrawer from '../components/FilterDrawer';

const mapStateToProps = (state, ownProps) => {
  const filterCount = React.Children.map(ownProps.children, (child) => {
    const collectionName = child.props.collectionName;
    const initialFilters = child.props.initialFilters[collectionName];
    return state[collectionName].selected.size + initialFilters.size;
  }).reduce((prev, cur) => prev + cur, 0);

  return {
    collapsed: state.filterDrawerCollapsed,
    filterCount,
  };
};

const mapDispatchToProps = dispatch => ({
  onToggleClick: () => {
    dispatch(toggleFilterDrawer());
  },
});

const VisibleFilterDrawer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterDrawer);

export default VisibleFilterDrawer;
