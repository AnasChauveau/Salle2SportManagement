// Mock pour les appels API côté frontend (exemple avec axios)
const axios = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};
module.exports = axios;