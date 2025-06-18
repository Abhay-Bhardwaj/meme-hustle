import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
