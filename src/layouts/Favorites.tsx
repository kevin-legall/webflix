import React, {useEffect, useState} from 'react';
import {Media} from "../models/Media";
import MediaComponent from "../components/MediaComponent";
import Mediasdisplay from "../components/Mediasdisplay";
import {isEmpty} from "../utils/isEmpty";
import {getAllFavoris} from "../api/MediaService";

const Favorites = () => {

    const [favData, setFavData] = useState<Media[]>([])
    const getData = async () => {
        const fav = await getAllFavoris();
        console.log(fav)
        return fav;
    }

    useEffect(() => {
        getData();
    }, [favData]);

    return (
        <main>
            {!isEmpty(favData) ? (
                <ul>{favData.map((fav)=> (
                    <li>coucou</li>
                ))}</ul>
            ) : (
            <h1>Tu n'as pas encore de favoris :(</h1>
            )}

        </main>
    );
};

export default Favorites;