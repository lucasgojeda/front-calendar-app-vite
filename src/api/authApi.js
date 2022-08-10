import axios from 'axios';

const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;

const token = localStorage.getItem('token');

export const authApi = axios.create({
    baseURL: baseUrl,
    headers: {'x-token': token}
});