import React, {useState} from 'react';
import Navbar from "../components/Navbar";
import Mediasdisplay from "../components/Mediasdisplay";
import {Media} from "../models/Media";
import {getAllSeries, getAllMedias} from "../api/MediaService";

const Series = () => {

    const [series, setSeries] = useState<Media[]>([]);
    const allSeries = async () => {

        try {
            const seriesData: Media[] = await getAllSeries();
            setSeries(seriesData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données : ', error);
        }

    }

    allSeries();

    return (
        <main>
            <h1>Séries</h1>
            <Mediasdisplay getContent={series} />
        </main>
    );
};

export default Series;