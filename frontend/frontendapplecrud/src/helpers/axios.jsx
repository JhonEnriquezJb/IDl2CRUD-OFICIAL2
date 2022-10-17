import axios from 'axios'
const baseUrl = 'http://localhost:8000/api';

export const axiosSinToken = (endpoint, data = null, method = 'GET') => {
    const url = `${baseUrl}${endpoint}`;

    if (method === 'GET') {
        return axios(url).then(({data}) => {
            return data;
        }).catch(({ response }) => {
            return response.data;
        });
    } else {
        const config = {
            method,
            url,
            headers: {
                'Content-type': 'application/json'
            },
            data
        }
        return axios(config).then(({data}) => {
            return data;
        }).catch(({ response }) => {
            return response.data;
        });
    }
}

