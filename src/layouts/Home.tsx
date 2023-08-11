import React, {useState} from 'react';
import Mediasdisplay from "../components/Mediasdisplay";
import {Media} from "../models/Media";
import {getPopularMovies} from "../api/MediaService";


interface HomeProps {
    isAsc?: boolean,
    searchText?: string,
    idGenres?: number[],
}

const Home = ({ isAsc, searchText, idGenres }: HomeProps) => {

    const getpopularMovies = async ():Promise<Media[]> => {
        const [popularMovies, setPopularMovies] = useState<Media[]>([]);

        try {
            const popularMoviesData: Media[] = await getPopularMovies();
            setPopularMovies(popularMoviesData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données : ', error);
        }

        return popularMovies;
    }

    return (
        <main>
            <h1>Home</h1>
            <Mediasdisplay getContent={getpopularMovies()} idGenres={idGenres} isAsc={isAsc} searchText={searchText} />
        </main>
    );
};

export default Home;