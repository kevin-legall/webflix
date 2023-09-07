import React, {useEffect, useState} from 'react';
import Mediasdisplay from "../components/Mediasdisplay";
import {Media} from "../models/Media";
import {getAllMedias, getAllMediasByName} from "../api/MediaService";
import {useAppSelector} from "../app/hooks";

const Home = () => {

    const [popularMedias, setPopularMedias] = useState<Media[]>([]);
    const query = useAppSelector((state) => state.query.value);

    const getpopularMedias = async () => {

        try {
            const popularMediasData: Media[] = query ? await getAllMediasByName(query) : await getAllMedias();
            setPopularMedias(popularMediasData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données : ', error);
        }

    }

    useEffect(()=> {
        getpopularMedias();
    }, [query]);

    return (
        <main>
            <Mediasdisplay getContent={popularMedias} />
        </main>
    );
};

export default Home;