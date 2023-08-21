import React, {useState} from 'react';
import Navbar from "../components/Navbar";
import Mediasdisplay from "../components/Mediasdisplay";
import {Media} from "../models/Media";
import {getPopularMovies} from "../api/MediaService";
const List = () => {

    const [popularMovies, setPopularMovies] = useState<Media[]>([]);
    const getpopularMovies = async ():Promise<Media[]> => {

        try {
            const popularMoviesData: Media[] = await getPopularMovies();
            setPopularMovies(popularMoviesData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données : ', error);
        }

        return popularMovies;
    }

    getpopularMovies()

    return (
        <main>
            <h1>Ma liste</h1>
            <Mediasdisplay getContent={popularMovies}/>
        </main>
    );
};

export default List;