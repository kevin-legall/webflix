import React, {useState} from 'react';
import Mediasdisplay from "../components/Mediasdisplay";
import {getAllMoviesByName} from "../api/MediaService";
import {Movie} from "../models/Movie";
import {useAppSelector} from "../app/hooks";

const Movies = () => {

    const [movies, setMovies] = useState<Movie[]>([]);
    const query = useAppSelector((state) => state.query.value);
    const allMovies = async ():Promise<Movie[]> => {

        try {
            const moviesData: Movie[] = await getAllMoviesByName(query);
            setMovies(moviesData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données : ', error);
        }

        return movies;
    }

    allMovies();

    return (
        <main>
            <Mediasdisplay getContent={movies} />
        </main>
    );
};

export default Movies;