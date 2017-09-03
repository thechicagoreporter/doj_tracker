import PropTypes from 'prop-types';
import React from 'react';
import styles from './SearchForm.css';

/**
 * Incremental search for recommendations.
 */
class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      q: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <form className={styles.form}
        onSubmit={this.handleSubmit}>
        <input name="q"
          className={styles.searchInput}
          type="text"
          value={this.state.q}
          onChange={this.handleInputChange}
          placeholder="Search. ex: taser, data, body camera" />
      </form>
    );
  }

  /**
   * React lifecycle event after a componet updates.
   *
   * In our case, the update happens after we update state in
   * `handleInputChange()`.
   *
   * Call the `onSearch` handler to pass the state change upstream.
   */
  componentDidUpdate() {
    this.props.onSearch(this.state.q);
  }

  /**
   * Handler for input change event.
   *
   * @param {change} evt - change DOM event.
   * @listens change
   */
  handleInputChange(evt) {
    const target = evt.target;

    this.setState({
      [target.name]: target.value,
    });
  }

  /**
   * Handler for form submit event.
   *
   * This is a noop.  Our search is actually kicked off by change events on the
   * `q` input. We want to make sure we don't submit te form so the page
   * reloads.
   *
   * @param {submit} evt - submit DOM event.
   * @listens submit
   */
  // eslint-disable-next-line class-methods-use-this
  handleSubmit(evt) {
    evt.preventDefault();
  }
}

SearchForm.propTypes = {
  /**
   * Search callback. Takes the query string as an argument.
   */
  onSearch: PropTypes.func,
};

export default SearchForm;
