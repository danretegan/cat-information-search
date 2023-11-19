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

  // Așteaptă puțin înainte de a afișa detaliile pentru a oferi timp pentru încărcarea imaginii
  setTimeout(() => {
    const catDetails = document.createElement('div');
    catDetails.innerHTML = `
      <p><strong> ${cat[0].breeds[0].name} </strong></p>
      <p> ${cat[0].breeds[0].description}</p>
      <p><strong>Temperament:</strong> ${cat[0].breeds[0].temperament}</p>
    `;
    catInfo.appendChild(catDetails);
  }, 500); // Un timp de așteptare de 0.5 secunde (500 milisecunde) - poate fi ajustat pentru performanță
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
        // Tratează cazul în care nu există rase disponibile
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
    // Dacă nu există nicio rasă selectată, elimina informațiile despre pisică
    catInfo.innerHTML = '';
    return Promise.resolve(); // Returnează o promisiune rezolvată pentru a continua lanțul de promisiuni
  }

  return fetchCatByBreed(breedId)
    .then(cat => {
      displayCatInfo(cat);
      catInfo.classList.remove('loader');
      hideLoader();
    })
    .catch(error => {
      hideLoader();
      displayError();
      throw error; // Propagă eroarea mai departe pentru gestionare ulterioară
    });
}

function fillBreedSelect(breeds) {
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = 'Select a breed';

  breedSelect.innerHTML = ''; // Curăță opțiunile existente înainte de adăugare

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
      hideError(); // Ascunde mesajul de eroare
      catInfo.innerHTML = ''; // Șterge informațiile despre pisică de la selecțiile anterioare
      handleCatRequest(selectedBreedId)
        .then(() => hideError())
        .catch(() => displayError())
        .finally(() => hideLoader());
    }
  });
});