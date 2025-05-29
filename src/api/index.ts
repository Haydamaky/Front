import axios from 'axios';

export const client = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_NODE_ENV === 'development'
      ? process.env.NEXT_PUBLIC_API_URL_DEV
      : process.env.NEXT_PUBLIC_API_URL_PROD,
  withCredentials: true,
});
