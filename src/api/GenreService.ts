import axios, {AxiosResponse} from 'axios';
import {useState} from "react";
import {Genre} from "../models/Genre";
import {Movie} from "../models/Movie";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;
const API_TOKEN = process.env.REACT_APP_API_KEY;


export const getAllGenres = async (): Promise<Genre[]> => {

    try {
        const options = {
            method: 'GET',
            url: `${BASE_URL}/${API_VERSION}/genre/movie/list`,
            params: { language: 'fr' },
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_TOKEN}`
            }
        };

        const response:AxiosResponse<any> = await axios.request(options);
        const genresData: Genre[] = response.data.genres;

        return genresData;
    } catch (error) {
        console.error("Erreur Fetch getAllGenres", error);
        throw error;
    }
};

