import axios, { AxiosResponse } from 'axios';
import { Movie } from "../models/Movie";
import { Genre } from "../models/Genre";
import {getAllGenres} from "./GenreService";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;
const API_TOKEN = process.env.REACT_APP_API_KEY;

/**
 * Fonction pour récupérer tous les films en tendances
 */
export const getPopularMovies = async (): Promise<Movie[]> => {

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
        const popularMoviesData:Movie[] = response.data.results;

        const popularMovies: Movie[] = popularMoviesData.map((popularMovie: Movie) => {
            const movieGenres: Genre[] = genresData.filter((genre: Genre) => popularMovie.genre_ids.includes(genre.id));
            return new Movie(
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
        const moviesData:Movie[] = response.data.results;

        const movies: Movie[] = moviesData.map((movie: Movie) => {
            const movieGenres: Genre[] = genresData.filter((genre: Genre) => movie.genre_ids.includes(genre.id));
            return new Movie(
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

