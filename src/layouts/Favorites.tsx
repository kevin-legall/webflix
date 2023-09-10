import React, {useEffect, useState} from 'react';
import {Media} from "../models/Media";
import {getAllFavoris} from "../api/MediaService";
import MediaComponent from "../components/MediaComponent";
import Mediasdisplay from "../components/Mediasdisplay";

const Favorites = () => {

    const [favData, setFavData] = useState<Media[]>([]);

    const fetchData = async () => {
        try {
            setFavData(await getAllFavoris());
            console.log(favData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [favData]);

    return (
        <main>
            {
                <ul>{favData && favData.length > 0 ? (
                        favData.map((favoris)=> (
                            <Mediasdisplay key={favoris.id} getContent={favData} />
                        ))) : (
                        <h1>pas de favoris mec</h1>
                    )
                    }
                </ul>
            }
        </main>
    );
};

export default Favorites;
