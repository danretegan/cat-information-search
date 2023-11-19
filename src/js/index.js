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
    const catDetails = document.createElement('div');
    catDetails.innerHTML = `
      <p><strong> ${cat[0].breeds[0].name} </strong></p>
      <p> ${cat[0].breeds[0].description}</p>
      <p><strong>Temperament:</strong> ${cat[0].breeds[0].temperament}</p>
    `;
    catInfo.appendChild(catDetails);
    hideLoader(); // Ascunde Loader-ul după afișarea datelor pisicii
  };
}

function showLoader() {
  loader.style.display = 'inline-block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function handleBreedsRequest() {
  breedSelect.style.display = 'none'; // Ascunde selectorul de rase inițial

  showLoader();

  fetchBreeds()
    .then(breeds => {
      if (breeds.length === 0) {
        Notiflix.Notify.failure('No breeds available');
        return;
      }

      fillBreedSelect(breeds);
      breedSelect.style.display = 'block'; // Afișează selectorul de rase după umplerea acestuia
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Breeds Request went wrong! Try reloading the page!'
      );
      console.error('Error fetching breeds information:', error);
    })
    .finally(() => {
      hideLoader(); // Ascunde Loader-ul după finalizarea cererii, indiferent de rezultat
    });
}

function handleCatRequest(breedId) {
  if (!breedId) {
    catInfo.innerHTML = '';
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
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Cat Request went wrong! Try reloading the page!'
      );
      console.error('Error fetching cat information:', error);
    })
    .finally(() => {
      hideLoader(); // Ascunde Loader-ul după finalizarea cererii, indiferent de rezultat
      catInfo.classList.remove('loader'); // Elimină clasa loader de pe zona de informații a pisicii
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
  catInfo.classList.add('loader'); // Adaugă clasa loader pe zona de informații a pisicii

  handleBreedsRequest();

  breedSelect.addEventListener('change', event => {
    const selectedBreedId = event.target.value;
    if (selectedBreedId !== undefined) {
      catInfo.innerHTML = ''; // Șterge conținutul zonei de informații a pisicii înainte de a face o nouă cerere
      handleCatRequest(selectedBreedId);
    }
  });
});
