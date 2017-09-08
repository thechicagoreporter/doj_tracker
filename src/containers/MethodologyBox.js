import { connect } from 'react-redux';
import ContentBox from '../components/ContentBox';

const mapStateToProps = state => ({
  text: state.methodology,
});

export default connect(mapStateToProps)(ContentBox);
