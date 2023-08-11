import React, {useState} from 'react';
import Navbar from "../components/Navbar";
import Mediasdisplay from "../components/Mediasdisplay";
import {Media} from "../models/Media";
import {getAllMovies, getPopularMovies} from "../api/MediaService";

interface MediasdisplayProps {
    isAsc?: boolean,
    searchText?: string,
    idGenres?: number[],
}

const Movies = ({ isAsc, searchText, idGenres }: MediasdisplayProps) => {

    const allMovies = async ():Promise<Media[]> => {
        const [movies, setMovies] = useState<Media[]>([]);
        const [loading, setLoading] = useState(true);

        try {
            const moviesData: Media[] = await getAllMovies();
            setMovies(moviesData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données : ', error);
        }

        return movies;
    }

    return (
        <main>
            <h1>Films</h1>
            <Mediasdisplay getContent={getAllMovies()} idGenres={idGenres} isAsc={isAsc} searchText={searchText} />
        </main>
    );
};

export default Movies;