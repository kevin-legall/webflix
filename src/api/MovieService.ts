import axios, { AxiosResponse } from 'axios';
import { Movie } from "../models/Movie";
import { Genre } from "../models/Genre";
import {getAllGenres} from "./GenreService";
import {useState} from "react";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;
const API_TOKEN = process.env.REACT_APP_API_KEY;

/**
 * Fonction pour récupérer tous les films en tendances
 */
export const getAllMovies = async (): Promise<Movie[]> => {

    try {
        const genresData: Genre[] = await getAllGenres();

        const options = {
            method: 'GET',
            url: `${BASE_URL}/${API_VERSION}/movie/popular`,
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
                movie.original_title,
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


/**
 * Fonction pour récupérer tous les films selon ce que l'utilisateur aura mis dans la barre de recherche
 */
export const getMovieByName = async (query: string) => {

    const options = {
        method: 'GET',
        url: `${BASE_URL}/${API_VERSION}/search/movie`,
        params: {query: `${query}`, language: 'fr-FR'},
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_TOKEN}`
        }
    };

    axios.request(options)
        .then(function (response) {
            console.log(response.data.results);
        })
        .catch(function (error) {
            console.error("Erreur Fetch getMovieByName" + error);
        });
};

