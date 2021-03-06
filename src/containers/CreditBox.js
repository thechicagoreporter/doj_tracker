import { connect } from 'react-redux';
import ContentBox from '../components/ContentBox';

const mapStateToProps = state => ({
  text: state.credits,
});

export default connect(mapStateToProps)(ContentBox);
