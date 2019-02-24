import axios from 'axios';

export default axios.create({
  baseURL: 'https://crossorigin.me/',
  headers: {
    'Content-Type': 'application/json',
  },
});
// # sourceMappingURL=api.js.map
