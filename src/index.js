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
    creatNewMarkup('', '');
  } else {
    fetchCountries(inputStart).then(addMarkup).catch(addErrorMessage);
  }
}

function addMarkup(countriesArr) {
  if (countriesArr.length > 10) {
    addInformMessage();
  } else if (countriesArr.length === 1) {
    addCountryInformMarkup(countriesArr);
  } else {
    addCountrysListMarkup(countriesArr);
  }
}

function addCountryInformMarkup(country) {
  const [
    {
      name: countryName,
      capital,
      population,
      flags: { svg },
      languages,
    },
  ] = country;
  const langsStr = languages.map(({ name }) => name).join(', ');

  const markup = `<div class="country-wrapper">
        <img src="${svg}" alt="${countryName}" width=50/>
        <h1>${countryName}</h1>
      </div>
      <h2>Capital: <span>${capital}</span></h2>
      <h2>Population: <span>${population}</span></h2>
      <h2>Languages: <span>${langsStr}</span></h2>`;

  creatNewMarkup('', markup);
}

function addCountrysListMarkup(countriesList) {
  const markup = countriesList
    .map(
      ({ name, flags: { svg } }) =>
        `<li>
            <img src="${svg}" alt="${name}" width=50/>
            <h2>${name}</h2>
        </li>`
    )
    .join('');

  creatNewMarkup(markup, '');
}

function addErrorMessage(error) {
  const strErr = 'Oops, there is no country with that name';

  console.log('error :>> ', error.message);
  if (error.message === '404') {
    creatNewMarkup('', '');
    Notify.failure(strErr);
  }
}

function addInformMessage() {
  const strTooMany =
    'Too many matches found. Please enter a more specific name.';
  creatNewMarkup('', '');
  Notify.info(strTooMany);
}

function creatNewMarkup(countrysListMarkup, countryInformMarkup) {
  countryInfo.innerHTML = countryInformMarkup;
  countryList.innerHTML = countrysListMarkup;
}

function addInlineStyles() {
  const extraStyles = `<style>
        body {margin: 10px;}
        h1 {display: inline}
        h2 {margin: 0;}
        ul {list-style: none;padding: 0}
        li {display: flex;padding: 5px}
        img {margin-right: 10px;}
        span {font-weight: 400;}
    </style>`;
  document.head.insertAdjacentHTML('beforeend', extraStyles);
}
//just for commit
