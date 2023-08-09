import React, { useEffect, useState } from 'react';
import MovieComponent from "./MovieComponent";
import { Movie } from "../models/Movie";
import {getAllMovies, getPopularMovies} from "../api/MovieService";
import LoadingComponent from "./LoadingComponent";

interface MoviesdisplayProps {
    isAsc?: boolean,
    searchText?:string,
    idGenres?:number[],
}

const Moviesdisplay = ({ isAsc, searchText, idGenres }: MoviesdisplayProps) => {

    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
            try {
                setTimeout(async () => {
                    const moviesData: Movie[] = await getPopularMovies();
                    setMovies(moviesData);
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.error('Erreur lors de la récupération des données : ', error);
            }
    }, []);

    const sortedMovies = movies.filter((movie) =>
        movie.original_title.toLowerCase().includes(searchText ? searchText.toLowerCase() : "")
    );

    const filteredMovies = sortedMovies.filter((movie) =>
        movie.genre_ids.some(id => idGenres)
    );

    return (
        <div>
            <ul>
                {loading ? (
                    <LoadingComponent />
                ) : filteredMovies.length > 0 ? (
                    filteredMovies.sort((a, b) => (isAsc ? b.vote_average - a.vote_average : a.vote_average - b.vote_average))
                        .map((movie: Movie) => (
                            <MovieComponent key={movie.id} movie={movie} />
                        ))
                ) : (
                    <h1>Pas de film trouvé :(</h1>
                )}
            </ul>
        </div>
    );
};

export default Moviesdisplay;
