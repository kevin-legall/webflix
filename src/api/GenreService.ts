import axios, {AxiosResponse} from 'axios';
import {Genre} from "../models/Genre";
import {useAppDispatch} from "../app/hooks";
import {getQuery} from "../features/searchFeature/query.slice";
import {getGenres} from "../features/displayFeature/genres.slice";
import {AppDispatch} from "../app/store";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;
const API_TOKEN = process.env.REACT_APP_API_KEY;

export const getAllMoviesGenres = async () => {

    try {
        const options = {
            method: 'GET',
            url: `${BASE_URL}/${API_VERSION}/genre/movie/list`,
            params: { language: 'fr-FR' },
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_TOKEN}`
            }
        };

        const response:AxiosResponse = await axios.request(options);
        const genresData: Genre[] = response.data.genres;

        return genresData;
    } catch (error) {
        console.error("Erreur Fetch getAllGenres", error);
        throw error;
    }
};

export const getAllSeriesGenres = async (): Promise<Genre[]> => {

    try {
        const options = {
            method: 'GET',
            url: `${BASE_URL}/${API_VERSION}/genre/tv/list`,
            params: { language: 'fr-FR' },
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_TOKEN}`
            }
        };

        const response:AxiosResponse = await axios.request(options);
        const genresData: Genre[] = response.data.genres;

        return genresData;
    } catch (error) {
        console.error("Erreur Fetch getAllGenres", error);
        throw error;
    }
};

export const getAllGenres = async (): Promise<Genre[]> => {

    try {
        const genresData: Genre[] = await getAllMoviesGenres();
        const genresSeriesData: Genre[] = await getAllSeriesGenres();

        // Utilisation d'un objet temporaire pour suivre les genres par leur ID
        const genreMap: Record<number, Genre> = {};

        // Ajoutez les genres des films au tableau genreMap
        genresData.forEach((genre) => {
            genreMap[genre.id] = genre;
        });

        // Ajoutez les genres des séries au tableau genreMap
        genresSeriesData.forEach((genre) => {
            // Vérifiez si le genre existe déjà dans le genreMap
            if (!genreMap[genre.id]) {
                genreMap[genre.id] = genre;
            }
        });

        // Convertissez l'objet genreMap en tableau
        const allGenres: Genre[] = Object.values(genreMap);

        return allGenres;
    } catch (error) {
        console.error("Erreur Fetch getAllGenres", error);
        throw error;
    }
};