import React, { useEffect, useState } from 'react';
import MovieComponent from "./MovieComponent";
import { Movie } from "../models/Movie";
import {getAllMovies, getPopularMovies} from "../api/MovieService";
import LoadingComponent from "./LoadingComponent";

interface MoviesdisplayProps {
    isAsc: boolean,
    searchText:string,
}

const Moviesdisplay = ({ isAsc, searchText }: MoviesdisplayProps) => {

    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const moviesData: Movie[] = await getPopularMovies();
                setMovies(moviesData);
            } catch (error) {
                console.error('Erreur lors de la récupération des données : ', error);
            }
        };

        fetchData();
    }, []);

    const filteredMovies = movies.filter((movie) =>
        movie.original_title.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div>
            <ul>
                {filteredMovies.length > 0 ? (
                    filteredMovies.sort((a, b) => (isAsc ? b.vote_average - a.vote_average : a.vote_average - b.vote_average))
                        .map((movie: Movie) => (
                            <MovieComponent key={movie.id} movie={movie} />
                        ))
                ) : (
                    <LoadingComponent />
                )}
            </ul>
        </div>
    );
};

export default Moviesdisplay;
