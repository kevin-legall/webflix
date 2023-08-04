import React, { useEffect, useState } from 'react';
import MovieComponent from "./MovieComponent";
import { Movie } from "../models/Movie";
import { Genre } from "../models/Genre";
import {getAllMovies} from "../api/MovieService";

interface Props {
    genres:Genre[]
}

const FetchMovies: React.FC = () => {

    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getAllMovies().then((data)=> {
                    setMovies(data)
                })


            } catch (error) {
                console.error('Erreur lors de la récupération des données : ', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {movies.length > 0 ?
            <ul>
                {
                    movies.map((movie: Movie) => (
                        <MovieComponent key={movie.id} movie={movie} categoriesById={categoriesById}/>
                    ))
                }
            </ul>: }

        </div>
    );
};

export default FetchMovies;
