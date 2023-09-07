import React, {useEffect, useState} from 'react';
import Mediasdisplay from "../components/Mediasdisplay";
import {getAllSeries, getAllSeriesByName} from "../api/MediaService";
import {useAppSelector} from "../app/hooks";
import {Serie} from "../models/Serie";

const Series = () => {

    const [series, setSeries] = useState<Serie[]>([]);
    const query = useAppSelector((state) => state.query.value);
    const allSeries = async ():Promise<Serie[]> => {

        try {
            const seriesData: Serie[] = query ? await getAllSeriesByName(query) : await getAllSeries();
            setSeries(seriesData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données : ', error);
        }
        return series;
    }

    useEffect(()=> {
        allSeries();
    }, [query]);

    return (
        <main>
            <Mediasdisplay getContent={series} />
        </main>
    );
};

export default Series;