import axios from 'axios';

const ENDPOINT = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_Dlptjwsu63vx6XV9KOwPMGBvJ1I6tLn8AQcu0oSQmnD0byZGZpKZgz42In5XIjqt';

axios.defaults.headers.common['x-api-key'] = API_KEY;

// Funcția pentru a obține lista de rase:
export function fetchBreeds() {
  return axios
    .get(`${ENDPOINT}/breeds`)
    .then(response => response.data)
    .catch(() => {
      throw new Error('Failed to fetch breeds');
    });
}

// Funcția pentru a obține informații despre pisică în funcție de breedId:
export function fetchCatByBreed(breedId) {
  return axios
    .get(`${ENDPOINT}/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(() => {
      throw new Error('Failed to fetch cat information');
    });
}
