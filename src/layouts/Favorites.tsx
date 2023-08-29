import React, {useEffect, useState} from 'react';
import Mediasdisplay from "../components/Mediasdisplay";
import {Media} from "../models/Media";
import axios from "axios";
import MediaComponent from "../components/MediaComponent";
import {Movie} from "../models/Movie";
import {Serie} from "../models/Serie";

const Favorites = () => {

    const [favData, setFavData] = useState<Media[]>([])

    const getData = () => {
        axios.get("http://localhost:3001/favoris")
            .then((res) => setFavData(res.data))
    }

    useEffect(() => getData(), []);

    return (
        <main>
            <h1>Mes coups de coeurs</h1>
            {
                favData.map((favoris:Media)=> (
                    <MediaComponent key={favoris.id} media={favoris}/>
                ))
            }
        </main>
    );
};

export default Favorites;