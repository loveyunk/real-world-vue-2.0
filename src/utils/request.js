import axios from 'axios';

const client = axios.create({
  baseURL: `http://localhost:3000`,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

const request = options => {
  return client(options);
};

export default request;
