import PropTypes from 'prop-types';
import React from 'react';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      q: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  render() {
    return (
      <form className="search-form">
        <h2>Search</h2>

        <input name="q"
          type="text"
          value={this.state.q}
          onChange={this.handleInputChange}
          placeholder="Enter a search term" />
      </form>
    );
  }

  componentDidUpdate() {
    this.props.onSearch(this.state.q);
  }

  handleInputChange(evt) {
    const target = evt.target;

    this.setState({
      [target.name]: target.value,
    });
  }
}

SearchForm.propTypes = {
  onSearch: PropTypes.func,
};

export default SearchForm;
