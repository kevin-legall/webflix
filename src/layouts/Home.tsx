import React, {useState} from 'react';
import Mediasdisplay from "../components/Mediasdisplay";
import {Media} from "../models/Media";
import {getPopularMovies} from "../api/MediaService";

const Home = () => {

    const [popularMovies, setPopularMovies] = useState<Media[]>([]);
    const getpopularMovies = async () => {

        try {
            const popularMoviesData: Media[] = await getPopularMovies();
            setPopularMovies(popularMoviesData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données : ', error);
        }

    }

    getpopularMovies();

    return (
        <main>
            <h1>Home</h1>
            <Mediasdisplay getContent={popularMovies} />
        </main>
    );
};

export default Home;