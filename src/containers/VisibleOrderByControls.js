import { connect } from 'react-redux';
import { setOrderBy } from '../actions';
import OrderByControls from '../components/OrderByControls';

const mapStateToProps = state => ({
  orderBy: state.orderBy.orderBy,
  direction: state.orderBy.direction,
});

const mapDispatchToProps = dispatch => ({
  setOrderBy: (orderBy, direction) => {
    dispatch(setOrderBy(orderBy, direction));
  },
});

const VisibleOrderByControls = connect(mapStateToProps, mapDispatchToProps)(OrderByControls);

export default VisibleOrderByControls;
