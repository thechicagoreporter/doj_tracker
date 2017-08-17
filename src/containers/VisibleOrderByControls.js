import { connect } from 'react-redux';
import OrderByControls from '../components/OrderByControls';

const mapStateToProps = state => ({
  orderBy: state.orderBy,
});

const VisibleOrderByControls = connect(mapStateToProps)(OrderByControls);

export default VisibleOrderByControls;
