import axios from 'axios';

export const Request = (baseURL: string) => axios.create({
  baseURL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json'
  }
});


