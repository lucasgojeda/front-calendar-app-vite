import moment from 'moment';

const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;


export const fetchSinToken = (endPoint, data, method = 'GET') => {

    const url = `${baseUrl}/${endPoint} `; // localhost:3030/api/

    try {
        if (method === 'GET') {
            return fetch(url);
        } else {
            return fetch(url, {
                method,
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export const fetchConToken = (endPoint, data, method = 'GET') => {

    const url = `${baseUrl}/${endPoint} `; // localhost:3030/api/

    const token = localStorage.getItem('token');

    try {
        if (token) {

            if (method === 'GET') {
                return fetch(url, {
                    method,
                    headers: {
                        'x-token': token
                    }
                });
            } else {
                return fetch(url, {
                    method,
                    headers: {
                        'content-type': 'application/json',
                        'x-token': token
                    },
                    body: JSON.stringify(data)
                })
            }
        }
    } catch (error) {
        console.log(error)
    }

}