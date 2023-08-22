import React, {ChangeEvent, useEffect, useState} from 'react';
import MediaComponent from "./MediaComponent";
import { Media } from "../models/Media";
import LoadingComponent from "./LoadingComponent";
import {useDispatch, useSelector} from "react-redux";
import {setSearchQuery} from "../actions/movies.action";
import {RootState} from "../reducers";
import {isEmpty} from "../utils/isEmpty";

export interface MediaDisplayProps {
    getContent
}

const Mediasdisplay = ({getContent}:MediaDisplayProps) => {
    const [loading, setLoading] = useState(true);
    const [medias, setMedias] = useState<Media[]>([]);

    setTimeout(() => {
        getContent
        if (medias.length > 0) {
            setLoading(false);
        }
    }, 100);

    console.log(medias);

    const dispatch = useDispatch();
    const searchQuery = useSelector((state:RootState) => state.name == searchQuery);

    const handleSearchInputChange = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchQuery(e.target.value));
    };

    setMedias(medias.filter(media =>
        media.title.toLowerCase().includes(searchQuery.toLowerCase())
    ));

    return (
        <ul className="movies-ul">
            {loading ? (
                <LoadingComponent />
            ) : !isEmpty(medias) ? (
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
