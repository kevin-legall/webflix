import React, {ChangeEvent, useEffect, useState} from 'react';
import MediaComponent from "./MediaComponent";
import { Media } from "../models/Media";
import LoadingComponent from "./LoadingComponent";
import {useDispatch, useSelector} from "react-redux";
import {setSearchQuery} from "../actions/movies.action";
import {RootState} from "../reducers";

const Mediasdisplay = () => {
    const [loading, setLoading] = useState(true);
    const [medias, setMedias] = useState<Media[]>([]);

    setTimeout(() => {
        if (medias.length > 0) {
            setLoading(false);
        }
    }, 100);

    console.log(medias);

    const dispatch = useDispatch();
    const searchQuery = useSelector((state:RootState) => state.filter.searchQuery);

    const handleSearchInputChange = (event:ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchQuery(event.target.value));
    };

    medias = medias.filter(media =>
        media.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <ul className="movies-ul">
            {loading ? (
                <LoadingComponent />
            ) : medias.length > 0 ? (
                medias.sort((a, b) => (b.vote_average - a.vote_average))
                    .map((media: Media) => (
                        <MediaComponent key={media.id} media={media} />
                    ))
            ) : (
                <h1>Aucun film trouvé :(</h1>
            )}
        </ul>
    );





};

export default Mediasdisplay;
