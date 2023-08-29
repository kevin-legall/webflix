import React, {ChangeEvent, useEffect, useState} from 'react';
import MediaComponent from "./MediaComponent";
import { Media } from "../models/Media";
import LoadingComponent from "./LoadingComponent";
import {useDispatch, useSelector} from "react-redux";
import {setSearchQuery} from "../actions/movies.action";
import {RootState} from "../reducers";
import {isEmpty} from "../utils/isEmpty";

export interface MediaDisplayProps {
    getContent:Media[];
}

const Mediasdisplay = ({getContent}:MediaDisplayProps) => {
    const [loading, setLoading] = useState(true);
    const [medias, setMedias] = useState<Media[]>([]);

    const fetchData = async () => {
        setMedias(getContent);
        if (medias.length > 0) {
            setLoading(false);
        } else {
            console.log("connard")
            setLoading(true);
        }
    }

    useEffect(()=> {
        fetchData().catch(console.error);
    }, [fetchData]);

    console.log(medias);

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
