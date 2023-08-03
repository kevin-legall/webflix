import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;
const API_TOKEN = process.env.REACT_APP_API_KEY;

export const getAllGenres = async () => {

    const options = {
        method: 'GET',
        url: `${BASE_URL}/${API_VERSION}/genre/movie/list`,
        params: {language: 'fr'},
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_TOKEN}`
        }
    };

    axios.request(options)
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.error(error);
        });
};

