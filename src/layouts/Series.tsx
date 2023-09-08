import React, {useEffect, useState} from 'react';
import Mediasdisplay from "../components/Mediasdisplay";
import {
    getAllMovies,
    getAllMoviesByGenres,
    getAllMoviesByName,
    getAllSeries, getAllSeriesByGenres,
    getAllSeriesByName
} from "../api/MediaService";
import {useAppSelector} from "../app/hooks";
import {Serie} from "../models/Serie";

const Series = () => {

    const [series, setSeries] = useState<Serie[]>([]);
    const query = useAppSelector((state) => state.query.value);
    const genresId = useAppSelector((state) => state.genresId.value);
    const allSeries = async ():Promise<Serie[]> => {

        try {
            const seriesData: Serie[] = query ? await getAllSeriesByName(query) : genresId ? await getAllSeriesByGenres(genresId) : await getAllSeries();
            setSeries(seriesData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données : ', error);
        }
        return series;
    }

    useEffect(()=> {
        allSeries();
    }, [query, genresId]);

    return (
        <main>
            <Mediasdisplay getContent={series} />
        </main>
    );
};

export default Series;