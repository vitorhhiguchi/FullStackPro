import axios from 'axios';

// Base da URL: https://api.themoviedb.org/3/
// URL DA API: movie/now_playing?api_key=ed29abd0f9e9c5817d9487e6a99b2454&language=pt-br

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;