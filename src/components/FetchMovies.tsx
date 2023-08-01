import React, {useEffect, useState} from 'react';
import axios from "axios";
import MovieComponent from "./MovieComponent";
import { Movie } from "../models/Movie";
import { Genre } from "../models/Genre";

const FetchMovies = () => {

    const [movies, setMovies] = useState<Movie[]>([]);
    const [genres, setGenres] = useState<Genre[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [moviesResponse, genresResponse] = await Promise.all([
                    axios.get('https://api.themoviedb.org/3/movie/popular', options),
                    axios.get('https://api.themoviedb.org/3/genre/movie/list', options),
                ]);

                setMovies(moviesResponse.data.results);
                setGenres(genresResponse.data.genres);
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
            }
        };

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZWVjZTA4MDU3ZmVhMjRkNzI1ZGMyMTc1ZWZmOGY4NSIsInN1YiI6IjY0YzM2NmRkNDMyNTBmMDBlODA0NWFlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fz8Zd74v5UOGKpBtBIdhelLPKM6ntHVrGQNS1yBU1kk'
            }
        };

        fetchData();

        if (movies.length > 0 && genres.length > 0) {
            genres.forEach((genre) => {
                movies.filter((movie) => {
                    if (movie.genres_ids?.includes(genre.id)) {
                        console.log("BRAVOOOOOOO")
                        movie.genres.push(genre);
                    }
                    return null;
                });
            });
        }
    }, [movies, genres]);

    return (
        <div>
            <ul>
                {
                    movies.map((movie: Movie) => (
                        <MovieComponent key={movie.id} movie={movie} />
                    ))
                }
            </ul>
        </div>
    );
};

export default FetchMovies;