import { connect } from 'react-redux';
import { search } from '../actions';
import SearchForm from '../components/SearchForm';

// eslint-disable-next-line no-unused-vars
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onSearch: (q) => {
    dispatch(search(q));
  },
});

const ActiveSearchForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchForm);

export default ActiveSearchForm;
