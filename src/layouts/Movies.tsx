import React, {useState} from 'react';
import Navbar from "../components/Navbar";
import Mediasdisplay from "../components/Mediasdisplay";
import {Media} from "../models/Media";
import {getAllMovies, getPopularMovies} from "../api/MediaService";

const Movies = () => {

    const [movies, setMovies] = useState<Media[]>([]);
    const allMovies = async ():Promise<Media[]> => {

        try {
            const moviesData: Media[] = await getAllMovies();
            setMovies(moviesData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données : ', error);
        }

        return movies;
    }

    allMovies()

    return (
        <main>
            <h1>Films</h1>
            <Mediasdisplay getContent={movies} />
        </main>
    );
};

export default Movies;