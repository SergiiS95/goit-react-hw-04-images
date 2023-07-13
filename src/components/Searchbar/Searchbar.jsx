import css from './Searchbar.module.css';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export class Searchbar extends Component {
  state = {
    inputQuery: '',
  };
  handleChange = event => {
    this.setState({ inputQuery: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const inputSearchForm = event.target.elements.searchForm.value;
    if (inputSearchForm.trim() === '') {
      Notify.warning('Please enter something');
      return;
    }
    this.props.onSubmit(inputSearchForm);
    this.setState({
      inputQuery: '',
    });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            name="searchForm"
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
            value={this.state.inputQuery}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
