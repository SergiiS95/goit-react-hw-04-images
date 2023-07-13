import css from './Searchbar.module.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const Searchbar = ({ onSubmit }) => {
  const [inputQuery, setInputQuery] = useState('');

  const handleChange = event => {
    setInputQuery(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const inputSearchForm = event.target.elements.searchForm.value;
    if (inputSearchForm.trim() === '') {
      Notify.warning('Please enter something');
      return;
    }
    onSubmit(inputSearchForm);
    setInputQuery('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
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
          value={inputQuery}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
