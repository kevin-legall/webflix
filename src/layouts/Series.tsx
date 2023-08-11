import React, {useState} from 'react';
import Navbar from "../components/Navbar";
import Mediasdisplay from "../components/Mediasdisplay";
import {Media} from "../models/Media";
import {getAllSeries, getPopularMovies} from "../api/MediaService";

interface HomeProps {
    isAsc?: boolean,
    searchText?: string,
    idGenres?: number[],
}

const Series = ({ isAsc, searchText, idGenres }: HomeProps) => {

    const allSeries = async ():Promise<Media[]> => {
        const [series, setSeries] = useState<Media[]>([]);

        try {
            const seriesData: Media[] = await getAllSeries();
            setSeries(seriesData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données : ', error);
        }

        return series;
    }

    return (
        <main>
            <h1>Séries</h1>
            <Mediasdisplay getContent={getAllSeries()} idGenres={idGenres} isAsc={isAsc} searchText={searchText} />
        </main>
    );
};

export default Series;