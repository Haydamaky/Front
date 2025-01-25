import axios from 'axios';

export const client = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
});

console.log(process.env.API_URL);
