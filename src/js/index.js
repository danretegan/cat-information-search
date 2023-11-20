import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

document.addEventListener('DOMContentLoaded', () => {
  const breedSelectElement = document.getElementById('breed-select');
  const loader = document.querySelector('.loader');
  const catInfo = document.querySelector('.cat-info');

  loader.style.display = 'inline-block'; // Afișează loader-ul la început

  fetchBreeds()
    .then(breeds => {
      const breedOptions = breeds.map(breed => ({
        text: breed.name,
        value: breed.id,
      }));

      breedOptions.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.textContent = option.text;
        breedSelectElement.appendChild(optionElement);
      });

      const slimBreedSelect = new SlimSelect({
        select: '#breed-select',
        placeholder: 'Select a breed',
        allowDeselect: true,
        alwaysOn: false,
      });

      loader.style.display = 'none'; // Ascunde loader-ul după ce s-au încărcat datele

      breedSelectElement.addEventListener('change', event => {
        const selectedBreedId = event.target.value;

        if (selectedBreedId) {
          loader.style.display = 'inline-block'; // Afișează loader-ul la selectarea unei rase de pisici
          catInfo.style.display = 'none'; // Ascunde informațiile despre pisică la selectarea unei rase de pisici

          fetchCatByBreed(selectedBreedId)
            .then(cat => {
              displayCatInfo(cat);
            })
            .catch(error => {
              console.error('Error fetching cat information:', error);
              loader.style.display = 'none'; // Ascunde loader-ul în caz de eroare
            });
        }
      });
    })
    .catch(error => {
      console.error('Error fetching breeds:', error);
      loader.style.display = 'none'; // Ascunde loader-ul în caz de eroare
    });

  function displayCatInfo(cat) {
    const catImage = document.createElement('img');
    catImage.src = cat[0].url;
    catImage.alt = 'Cat Image';

    catImage.onload = () => {
      catInfo.innerHTML = '';
      catInfo.appendChild(catImage);

      const catDetails = document.createElement('div');
      catDetails.innerHTML = `
        <p><strong>${cat[0].breeds[0].name}</strong></p>
        <p>${cat[0].breeds[0].description}</p>
        <p><strong>Temperament:</strong> ${cat[0].breeds[0].temperament}</p>
      `;
      catInfo.appendChild(catDetails);

      catInfo.style.display = 'block'; // Afișează informațiile despre pisică
      loader.style.display = 'none'; // Ascunde loader-ul după ce s-au încărcat informațiile
    };
  }
});
