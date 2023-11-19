import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');

function displayCatInfo(cat) {
  const catImage = document.createElement('img');
  catImage.src = cat[0].url;
  catImage.alt = 'Cat Image';
  catImage.onload = () => {
    catInfo.appendChild(catImage);
    catInfo.classList.remove('loader');

    const catDetails = document.createElement('div');
    catDetails.innerHTML = `
      <p><strong> ${cat[0].breeds[0].name} </strong></p>
      <p> ${cat[0].breeds[0].description}</p>
      <p><strong>Temperament:</strong> ${cat[0].breeds[0].temperament}</p>
    `;

    catInfo.appendChild(catDetails);
  };
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
        Notiflix.Notify.failure('No breeds available');
        hideLoader(); // Ascunde loader-ul în cazul în care nu există rase disponibile
        return; // Opriți continuarea logicii în acest caz
      }

      fillBreedSelect(breeds);

      breedSelect.classList.remove('loader');
      hideLoader();
    })
    .catch(error => {
      hideLoader();
      Notiflix.Notify.failure(
        'Oops! Breeds Request went wrong! Try reloading the page!'
      );
      console.error('Error fetching breeds information:', error);
    });
}

function handleCatRequest(breedId) {
  if (!breedId) {
    catInfo.innerHTML = '';
    catInfo.classList.remove('loader');
    return Promise.resolve();
  }

  showLoader();

  return fetchCatByBreed(breedId)
    .then(cat => {
      if (cat.length === 0) {
        catInfo.innerHTML = '';
        Notiflix.Notify.failure('No cat information available for this breed');
      } else {
        displayCatInfo(cat);
      }
      catInfo.classList.remove('loader');
      hideLoader(); // Ascunde loader-ul chiar dacă nu există date despre pisică pentru rasa selectată
    })
    .catch(error => {
      hideLoader();
      Notiflix.Notify.failure(
        'Oops! Cat Request went wrong! Try reloading the page!'
      );
      console.error('Error fetching cat information:', error);
    });
}

function fillBreedSelect(breeds) {
  breedSelect.innerHTML = '';

  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = 'Select a breed';
  breedSelect.appendChild(defaultOption);

  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  catInfo.classList.add('loader');
  breedSelect.classList.add('loader');

  handleBreedsRequest();

  breedSelect.addEventListener('change', event => {
    const selectedBreedId = event.target.value;
    if (selectedBreedId !== undefined) {
      showLoader();
      catInfo.innerHTML = '';
      handleCatRequest(selectedBreedId)
        .then(() => hideLoader())
        .catch(error => {
          Notiflix.Notify.failure('Error handling cat request');
          console.error('Error handling cat request', error);
          hideLoader();
        });
    }
  });
});
