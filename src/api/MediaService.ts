import axios, { AxiosResponse } from 'axios';
import { Genre } from "../models/Genre";
import {getAllMoviesGenres, getAllSeriesGenres} from "./GenreService";
import {Movie} from "../models/Movie";
import {Serie} from "../models/Serie";
import {Media} from "../models/Media";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;
const API_TOKEN = process.env.REACT_APP_API_KEY;

/**
 * Fonction pour récupérer tous les films et séries
 */
export const getAllMedias = async (): Promise<Media[]> => {

    try {
        const genresData: Genre[] = await getAllMoviesGenres();
        const genresSeriesData: Genre[] = await getAllSeriesGenres();
        const allGenres: Genre[] = genresData.concat(genresSeriesData);

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
        const popularMediasData:Media[] = response.data.results;

        console.log(popularMediasData);

        // @ts-ignore
        const allMedias:Media[] = popularMediasData.map((media: Media) => {
                const mediaGenres: Genre[] = allGenres.filter((genre: Genre) => media.genre_ids.includes(genre.id));
                if (media.media_type == "movie") {
                    console.log(media);
                        return new Movie (
                            media.id,
                            media.media_type,
                            media.title,
                            media.poster_path,
                            media.genre_ids,
                            media.overview,
                            media.vote_average,
                            media.vote_count,
                            mediaGenres
                        ) as Movie;
                } else if (media.media_type == "tv") {
                    console.log(media);
                    const serie = media as Serie;
                        return new Serie (
                            serie.id,
                            serie.media_type,
                            serie.original_name,
                            serie.poster_path,
                            serie.genre_ids,
                            serie.overview,
                            serie.vote_average,
                            serie.vote_count,
                            mediaGenres
                        );
                }
            });

        console.log(allMedias);

        return allMedias as Media[];

    } catch (error) {
        console.error("Erreur Fetch getAllMedias", error);
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
                    movie.media_type,
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

export const getAllSeries = async ():Promise<Serie[]> => {

    try {
        const genresData: Genre[] = await getAllSeriesGenres();

        const options = {
            method: 'GET',
            url: `${BASE_URL}/${API_VERSION}/trending/tv/day`,
            params: {language: 'fr-FR'},
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
                serie.media_type,
                serie.original_name,
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

