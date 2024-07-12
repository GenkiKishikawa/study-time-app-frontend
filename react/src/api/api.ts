import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';

const options = {
  ignoreHeaders: true,
}

const api = applyCaseMiddleware(
  axios.create({
    baseURL: 'http://localhost:3000/api/v1',
  }),
  options
)

export default api;