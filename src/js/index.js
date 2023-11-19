import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

function displayCatInfo(cat) {
  catInfo.innerHTML = `
    <img src="${cat[0].url}" alt="Cat Image">
  `;
  catInfo.classList.remove('loader');

  setTimeout(() => {
    const catDetails = document.createElement('div');
    catDetails.innerHTML = `
      <p><strong> ${cat[0].breeds[0].name} </strong></p>
      <p> ${cat[0].breeds[0].description}</p>
      <p><strong>Temperament:</strong> ${cat[0].breeds[0].temperament}</p>
    `;
    catInfo.appendChild(catDetails);
  }, 500);
}

function displayError() {
  error.classList.add('error-displayed');
}

function hideError() {
  error.classList.remove('error-displayed');
}

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function handleBreedsRequest() {
  showLoader();

  fetchBreeds()
    .then(breeds => {
      if (breeds.length === 0) {
        throw new Error('No breeds available');
      }

      fillBreedSelect(breeds);

      breedSelect.classList.remove('loader');
      hideLoader();
      hideError();
    })
    .catch(() => {
      hideLoader();
      displayError();
    });
}

function handleCatRequest(breedId) {
  if (!breedId) {
    catInfo.innerHTML = '';
    return Promise.resolve();
  }

  return fetchCatByBreed(breedId)
    .then(cat => {
      displayCatInfo(cat);
      catInfo.classList.remove('loader');
      hideLoader();
      hideError();
    })
    .catch(error => {
      hideLoader();
      displayError();
      throw error;
    });
}

function fillBreedSelect(breeds) {
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = 'Select a breed';

  breedSelect.innerHTML = '';

  breedSelect.appendChild(defaultOption);

  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  hideError();
  catInfo.classList.add('loader');
  breedSelect.classList.add('loader');

  handleBreedsRequest();

  breedSelect.addEventListener('change', event => {
    const selectedBreedId = event.target.value;
    if (selectedBreedId !== undefined) {
      showLoader();
      hideError();
      catInfo.innerHTML = '';
      handleCatRequest(selectedBreedId)
        .then(() => hideError())
        .catch(() => displayError())
        .finally(() => hideLoader());
    }
  });
});
