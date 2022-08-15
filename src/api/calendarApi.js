import axios from 'axios';

import { getEnvironmets } from '../helpers/getEnvironmets';

const { VITE_REACT_APP_API_URL } = getEnvironmets();


const calendarApi = axios.create({
    baseURL: VITE_REACT_APP_API_URL
});

// Todo: configurar interceptores
calendarApi.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
})

export default calendarApi;



