import axios, { AxiosResponse } from 'axios';
import { Genre } from "../models/Genre";
import {getAllGenres, getAllMoviesGenres, getAllSeriesGenres} from "./GenreService";
import {Movie} from "../models/Movie";
import {Serie} from "../models/Serie";
import {Media} from "../models/Media";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;
const API_TOKEN = process.env.REACT_APP_API_KEY;


export const getAllMedias = async (): Promise<Media[]> => {

    try {

        const allGenres: Genre[] = await getAllGenres();

        const options = {
            method: 'GET',
            url: `${BASE_URL}/${API_VERSION}/trending/all/day`,
            params: { language: 'fr-FR'},
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_TOKEN}`
            }
        };

        const response: AxiosResponse = await axios.request(options);
        const popularMediasData:Media[] = response.data.results;

        let allMedias:Media[] = popularMediasData.map((media: Media) => {
                const mediaGenres: Genre[] = allGenres.filter((genre: Genre) => media.genre_ids.includes(genre.id));
                if (media.media_type == "movie") {
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
                    ) as Media;
                } else {
                    const serie = media as Serie;
                    return new Serie (
                        serie.id,
                        serie.media_type,
                        serie.name,
                        serie.poster_path,
                        serie.genre_ids,
                        serie.overview,
                        serie.vote_average,
                        serie.vote_count,
                        mediaGenres
                    ) as Media;
                }

            });

        return allMedias;

    } catch (error) {
        console.error("Erreur Fetch getAllMedias", error);
        throw error;
    }
};

export const getAllMediasByName = async (query:string):Promise<Media[]> => {

    try {
        const genresData: Genre[] = await getAllMoviesGenres();
        const genresSeriesData: Genre[] = await getAllSeriesGenres();
        const allGenres: Genre[] = genresData.concat(genresSeriesData);

        const options = {
            method: 'GET',
            url: `${BASE_URL}/${API_VERSION}/search/multi`,
            params: {query: `${query}`, language: 'fr-FR'},
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_TOKEN}`
            }
        };

        const response: AxiosResponse = await axios.request(options);
        const mediasData:Media[] = response.data.results;

        let medias:Media[] = mediasData.filter((media: Media) => media.title && media.title.length > 0)
            .map((media: Media) => {
            const mediaGenres: Genre[] = allGenres.filter((genre: Genre) => media.genre_ids.includes(genre.id));
            if (media.media_type == "movie") {
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
                ) as Media;
            } else {
                const serie = media as Serie;
                return new Serie (
                    serie.id,
                    serie.media_type,
                    serie.name,
                    serie.poster_path,
                    serie.genre_ids,
                    serie.overview,
                    serie.vote_average,
                    serie.vote_count,
                    mediaGenres
                ) as Media;
            }
        });

        return medias;

    } catch (error) {
        console.error("Erreur Fetch getAllMovies", error);
        throw error;
    }
};

export const getAllMovies = async ():Promise<Movie[]> => {

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

        return movies;

    } catch (error) {
        console.error("Erreur Fetch getAllMovies", error);
        throw error;
    }
};

export const getAllMoviesByName = async (query:string):Promise<Movie[]> => {

    try {
        const genresData: Genre[] = await getAllMoviesGenres();

        const options = {
            method: 'GET',
            url: `${BASE_URL}/${API_VERSION}/search/movie`,
            params: {query: `${query}`, language: 'fr-FR'},
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_TOKEN}`
            }
        };

        const response: AxiosResponse = await axios.request(options);
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

        return movies;

    } catch (error) {
        console.error("Erreur Fetch getAllMovies", error);
        throw error;
    }
};

export const getAllMoviesByGenres = async (genresId:string):Promise<Movie[]> => {

    try {
        const genresData: Genre[] = await getAllMoviesGenres();

        const options = {
            method: 'GET',
            url: `${BASE_URL}/${API_VERSION}/discover/movie`,
            params: { language: 'fr',  with_genres: `${genresId}` },
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_TOKEN}`
            }
        };

        const response: AxiosResponse = await axios.request(options);
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
                serie.name,
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

export const getAllSeriesByName = async (query:string):Promise<Serie[]> => {

    try {
        const genresData: Genre[] = await getAllSeriesGenres();

        const options = {
            method: 'GET',
            url: `${BASE_URL}/${API_VERSION}/search/tv`,
            params: {query: `${query}`, language: 'fr-FR'},
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_TOKEN}`
            }
        };

        const response: AxiosResponse = await axios.request(options);
        const seriesData:Serie[] = response.data.results;

        const series: Serie[] = seriesData
            .filter((serie: Serie) => serie.name && serie.name.length > 0)
            .map((serie: Serie) => {
                const serieGenres: Genre[] = genresData.filter((genre: Genre) => serie.genre_ids.includes(genre.id));
                return new Serie(
                    serie.id,
                    serie.media_type,
                    serie.name,
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
        console.error("Erreur Fetch getAllMovies", error);
        throw error;
    }
};

export const getAllSeriesByGenres = async (genresId:string):Promise<Serie[]> => {

    try {
        const genresData: Genre[] = await getAllSeriesGenres();

        const options = {
            method: 'GET',
            url: `${BASE_URL}/${API_VERSION}/discover/tv`,
            params: { language: 'fr',  with_genres: `${genresId}` },
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_TOKEN}`
            }
        };

        const response: AxiosResponse = await axios.request(options);
        const seriesData:Serie[] = response.data.results;

        const series: Serie[] = seriesData
            .filter((serie: Serie) => serie.name && serie.name.length > 0)
            .map((serie: Serie) => {
                const serieGenres: Genre[] = genresData.filter((genre: Genre) => serie.genre_ids.includes(genre.id));
                return new Serie(
                    serie.id,
                    serie.media_type,
                    serie.name,
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
        console.error("Erreur Fetch getAllMovies", error);
        throw error;
    }
};

export const getAllFavoris = async ():Promise<Media[]> => {

    try {

        const allGenres: Genre[] = await getAllGenres();

        const favorisData:Media[] = [];
        console.log(allGenres)
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key) {
                console.log(key)
                const valueStr = localStorage.getItem(key);
                if (valueStr) {
                    console.log(valueStr)
                    const value: Media = JSON.parse(valueStr);
                    console.log(value)
                    favorisData.push(value);
                }
            }
        }
        console.log(favorisData)
        let favoris:Media[] = favorisData.map((fav: Media) => {
            const mediaGenres: Genre[] = allGenres;
            if (fav.media_type == "movie") {
                return new Movie (
                    fav.id,
                    fav.media_type,
                    fav.title,
                    fav.poster_path,
                    fav.genre_ids,
                    fav.overview,
                    fav.vote_average,
                    fav.vote_count,
                    mediaGenres
                ) as Media;
            } else {
                const serie = fav as Serie;
                return new Serie (
                    serie.id,
                    serie.media_type,
                    serie.name,
                    serie.poster_path,
                    serie.genre_ids,
                    serie.overview,
                    serie.vote_average,
                    serie.vote_count,
                    mediaGenres
                ) as Media;
            }
        });

        return favoris;

    } catch (error) {
        console.error("Erreur Fetch getAllFavoris", error);
        throw error;
    }
};