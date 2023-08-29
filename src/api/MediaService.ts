import axios, { AxiosResponse } from 'axios';
import { Media } from "../models/Media";
import { Genre } from "../models/Genre";
import {getAllMoviesGenres, getAllSeriesGenres} from "./GenreService";
import series from "../layouts/Series";
import {Movie} from "../models/Movie";
import {Serie} from "../models/Serie";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;
const API_TOKEN = process.env.REACT_APP_API_KEY;

/**
 * Fonction pour récupérer tous les films et séries
 */
export const getPopularMovies = async (): Promise<Movie[]> => {

    try {
        const genresData: Genre[] = await getAllMoviesGenres();

        const options = {
            method: 'GET',
            url: `${BASE_URL}/${API_VERSION}/trending/all/day`,
            params: { language: 'fr-FR', page: '1' },
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_TOKEN}`
            }
        };

        const response: AxiosResponse<any> = await axios.request(options);
        const popularMoviesData:Movie[] = response.data.results;

        console.log("Données brutes :", popularMoviesData);

        const popularMovies: Movie[] = popularMoviesData.map((popularMovie: Movie) => {
                const movieGenres: Genre[] = genresData.filter((genre: Genre) => popularMovie.genre_ids.includes(genre.id));
                return new Movie(
                    popularMovie.id, popularMovie.title, popularMovie.poster_path, popularMovie.genre_ids, popularMovie.overview, popularMovie.vote_average, popularMovie.vote_count, movieGenres);
            });
        console.log("Médias filtrés et mappés :", popularMovies);

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
        const genresData: Genre[] = await getAllMoviesGenres();

        const options = {
            method: 'GET',
            url: `${BASE_URL}/${API_VERSION}/trending/movie/day`,
            params: { language: 'fr' },
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_TOKEN}`
            }
        };

        const response: AxiosResponse<any> = await axios.request(options);
        const moviesData:Movie[] = response.data.results;

        const movies: Movie[] = moviesData
            .filter((movie: Movie) => movie.title && movie.title.length > 0)
            .map((movie: Movie) => {
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
        console.log("Médias filtrés et mappés :", movies);

        return movies;

    } catch (error) {
        console.error("Erreur Fetch getAllMovies", error);
        throw error;
    }
};

export const getAllSeries = async () => {

    try {
        const genresData: Genre[] = await getAllSeriesGenres();

        const options = {
            method: 'GET',
            url: `${BASE_URL}/${API_VERSION}/trending/tv/day`,
            params: {language: 'fr-FR', page: '1', sort_by: 'vote_average.asc'},
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_TOKEN}`
            }
        };

        const response: AxiosResponse<any> = await axios.request(options);
        const seriesData:Serie[] = response.data.results;

        const series: Serie[] = seriesData.map((serie: Serie) => {
            const serieGenres: Genre[] = genresData.filter((genre: Genre) => serie.genre_ids.includes(genre.id));
            return new Serie(
                serie.id,
                serie.title,
                serie.poster_path,
                serie.genre_ids,
                serie.overview,
                serie.vote_average,
                serie.vote_count,
                serieGenres
            );
        });

        return series;
    } catch (error) {
        console.error("Erreur Fetch getAllSeries", error);
        throw error;
    }
};

