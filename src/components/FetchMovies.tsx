import React, { useEffect, useState } from 'react';
import axios from "axios";
import MovieComponent from "./MovieComponent";
import { Movie } from "../models/Movie";
import { Genre } from "../models/Genre";
import GenreComponent from "./GenreComponent";

const FetchMovies: React.FC = () => {

    const [movies, setMovies] = useState<Movie[]>([]);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [categoriesById, setCategoriesById] = useState<{ [key: number]: Genre }>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [moviesResponse, genresResponse] = await Promise.all([
                    axios.get('https://api.themoviedb.org/3/movie/popular?language=fr-FR', options),
                    axios.get('https://api.themoviedb.org/3/genre/movie/list?language=fr-FR', options),
                ]);

                const genresData = genresResponse.data.genres.reduce((acc: { [key: number]: Genre }, genre: Genre) => {
                    acc[genre.id] = genre;
                    return acc;
                }, {});

                setMovies(moviesResponse.data.results);
                setGenres(genresResponse.data.genres);
                setCategoriesById(genresData);
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
    }, []);

    return (
        <div>
            <ul>
                {
                    movies.map((movie: Movie) => (
                        <MovieComponent key={movie.id} movie={movie} categoriesById={categoriesById}/>
                    ))
                }
            </ul>
        </div>
    );
};

export default FetchMovies;
