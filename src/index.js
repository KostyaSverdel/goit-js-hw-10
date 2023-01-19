import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const inputSearchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

addInlineStyles();

inputSearchBox.addEventListener('input', debounce(searchInput, DEBOUNCE_DELAY));

function searchInput(e) {
  const inputStart = e.target.value.trim();
  if (!inputStart) {
    updateMarkup('', '');
  } else {
    fetchCountries(inputStart).then(addMarkup).catch(createErrorMessage);
  }
}

function addMarkup(countriesArr) {
  if (countriesArr.length > 10) {
    createInfoMessage();
  } else if (countriesArr.length === 1) {
    createCountryInfoMarkup(countriesArr);
  } else {
    createCountryListMarkup(countriesArr);
  }
}
