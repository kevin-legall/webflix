import React, {useState} from 'react';
import Mediasdisplay from "../components/Mediasdisplay";
import {Media} from "../models/Media";
import {getAllMedias} from "../api/MediaService";

const Home = () => {

    const [popularMovies, setPopularMovies] = useState<Media[]>([]);
    const getpopularMovies = async () => {

        try {
            const popularMediasData: Media[] = await getAllMedias();
            setPopularMovies(popularMediasData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données : ', error);
        }

    }

    getpopularMovies();

    return (
        <main>
            <Mediasdisplay getContent={popularMovies} />
        </main>
    );
};

export default Home;