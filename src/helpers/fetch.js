import { getEnvironmets } from "./getEnvironmets";

const { VITE_REACT_APP_API_URL: baseUrl } = getEnvironmets()

/**
 * Esta función realiza peticiones http sin ningún token en dichas peticiones.
 * @function
 * @async
 * @param {String} endPoint - Endpoint del api para hacer la petición. Ej: 'events'.
 * @param {Object} data - Información a ser enviada a dicha api.
 * @param {String} method - Metodo de la petición. Ej: 'POST'.
 */
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

/**
 * Esta función realiza peticiones http con un token en las peticiones.
 * @function
 * @async
 * @param {String} endPoint - Endpoint del api para hacer la petición. Ej: 'events'.
 * @param {Object} data - Información a ser enviada a dicha api.
 * @param {String} method - Metodo de la petición. Ej: 'POST'.
 */
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