import axios, {AxiosResponse} from 'axios';
import {Genre} from "../models/Genre";
import {useAppDispatch} from "../app/hooks";
import {getQuery} from "../features/searchFeature/query.slice";
import {getGenres} from "../features/displayFeature/genres.slice";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;
const API_TOKEN = process.env.REACT_APP_API_KEY;



export const getAllMoviesGenres = async () => {
    const dispatch = useAppDispatch();

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

        const response:AxiosResponse = await axios.request(options);
        const genresData: Genre[] = response.data.genres;

        dispatch(getGenres(genresData));
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

export const getAllGenres = async (): Promise<Genre[]> => {

    try {
        const genresData: Genre[] = await getAllMoviesGenres();
        const genresSeriesData: Genre[] = await getAllSeriesGenres();
        const allGenres: Genre[] = genresData.concat(genresSeriesData);

        return allGenres;
    } catch (error) {
        console.error("Erreur Fetch getAllGenres", error);
        throw error;
    }
};