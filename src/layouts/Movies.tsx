import React, {useEffect, useState} from 'react';
import Mediasdisplay from "../components/Mediasdisplay";
import {getAllMovies, getAllMoviesByGenres, getAllMoviesByName, getAllSeries} from "../api/MediaService";
import {Movie} from "../models/Movie";
import {useAppSelector} from "../app/hooks";

const Movies = () => {

    const [movies, setMovies] = useState<Movie[]>([]);
    const query = useAppSelector((state) => state.query.value);
    const genresId = useAppSelector((state) => state.genresId.value);
    const allMovies = async ():Promise<Movie[]> => {

        try {
            const moviesData: Movie[] = query ? await getAllMoviesByName(query) : genresId ? await getAllMoviesByGenres(genresId) : await getAllMovies();
            setMovies(moviesData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données : ', error);
        }
        return movies;
    }

    useEffect(()=> {
        allMovies();
    }, [query, genresId]);


    return (
        <main>
            <Mediasdisplay getContent={movies} />
        </main>
    );
};

export default Movies;