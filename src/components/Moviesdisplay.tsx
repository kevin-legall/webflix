import React, { useEffect, useState } from 'react';
import MovieComponent from "./MovieComponent";
import { Movie } from "../models/Movie";
import { getAllMovies } from "../api/MovieService";
import LoadingComponent from "./LoadingComponent";
import HomeProps from "../layouts/Home";



interface MoviesdisplayProps {
    query: string,
    isAsc: boolean
}

const Moviesdisplay = ({ query, isAsc }: MoviesdisplayProps) => {

    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const moviesData: Movie[] = await getAllMovies();
                setMovies(moviesData);
            } catch (error) {
                console.error('Erreur lors de la récupération des données : ', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {movies.length > 0 ? (
                <ul>
                    {
                        movies.sort((a, b) => isAsc ? b.vote_average - a .vote_average : a.vote_average - b.vote_average)
                            .map((movie: Movie) => (
                            <MovieComponent key={movie.id} movie={movie} />
                        ))
                    }
                </ul>
            ) : (
                <LoadingComponent />
            )}
        </div>
    );
};

export default Moviesdisplay;
