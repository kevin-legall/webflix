import axios, { AxiosResponse } from 'axios';
import { Media } from "../models/Media";
import { Genre } from "../models/Genre";
import {getAllGenres} from "./GenreService";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;
const API_TOKEN = process.env.REACT_APP_API_KEY;

/**
 * Fonction pour récupérer tous les films en tendances
 */
export const getPopularMovies = async (): Promise<Media[]> => {

    try {
        const genresData: Genre[] = await getAllGenres();

        const options = {
            method: 'GET',
            url: `${BASE_URL}/${API_VERSION}/movie/popular`,
            params: { language: 'fr-FR', page: '1' },
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_TOKEN}`
            }
        };

        const response: AxiosResponse<any> = await axios.request(options);
        const popularMoviesData:Media[] = response.data.results;

        const popularMovies: Media[] = popularMoviesData.map((popularMovie: Media) => {
            const movieGenres: Genre[] = genresData.filter((genre: Genre) => popularMovie.genre_ids.includes(genre.id));
            return new Media(
                popularMovie.id,
                popularMovie.title,
                popularMovie.poster_path,
                popularMovie.genre_ids,
                popularMovie.overview,
                popularMovie.vote_average,
                popularMovie.vote_count,
                movieGenres
            );
        });

        return popularMovies;
    } catch (error) {
        console.error("Erreur Fetch getAllMovies", error);
        throw error;
    }
};


/**
 * Fonction pour récupérer tous les films
 */
export const getAllMovies = async () => {

    try {
        const genresData: Genre[] = await getAllGenres();

        const options = {
            method: 'GET',
            url: `${BASE_URL}/${API_VERSION}/discover/movie?page=1`,
            params: { language: 'fr' },
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_TOKEN}`
            }
        };

        const response: AxiosResponse<any> = await axios.request(options);
        const moviesData:Media[] = response.data.results;

        const movies: Media[] = moviesData.map((movie: Media) => {
            const movieGenres: Genre[] = genresData.filter((genre: Genre) => movie.genre_ids.includes(genre.id));
            return new Media(
                movie.id,
                movie.title,
                movie.poster_path,
                movie.genre_ids,
                movie.overview,
                movie.vote_average,
                movie.vote_count,
                movieGenres
            );
        });

        return movies;
    } catch (error) {
        console.error("Erreur Fetch getAllMovies", error);
        throw error;
    }
};

export const getAllSeries = async () => {

    try {
        const genresData: Genre[] = await getAllGenres();

        const options = {
            method: 'GET',
            url: `${BASE_URL}/${API_VERSION}/discover/tv`,
            params: {language: 'fr-FR', page: '1', sort_by: 'vote_average.asc'},
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZWVjZTA4MDU3ZmVhMjRkNzI1ZGMyMTc1ZWZmOGY4NSIsInN1YiI6IjY0YzM2NmRkNDMyNTBmMDBlODA0NWFlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fz8Zd74v5UOGKpBtBIdhelLPKM6ntHVrGQNS1yBU1kk'
            }
        };

        const response: AxiosResponse<any> = await axios.request(options);
        const mediasData:Media[] = response.data.results;

        const medias: Media[] = mediasData.map((media: Media) => {
            const mediaGenres: Genre[] = genresData.filter((genre: Genre) => media.genre_ids.includes(genre.id));
            return new Media(
                media.id,
                media.title,
                media.poster_path,
                media.genre_ids,
                media.overview,
                media.vote_average,
                media.vote_count,
                mediaGenres
            );
        });

        return medias;
    } catch (error) {
        console.error("Erreur Fetch getAllSeries", error);
        throw error;
    }
};

