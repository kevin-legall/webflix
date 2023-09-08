import React, {ChangeEvent, useEffect, useState} from 'react';
import MediaComponent from "./MediaComponent";
import { Media } from "../models/Media";
import LoadingComponent from "./LoadingComponent";
import {isEmpty} from "../utils/isEmpty";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {useLocation} from "react-router-dom";
import {getAllGenres, getAllMoviesGenres, getAllSeriesGenres} from "../api/GenreService";
import {getGenres} from "../features/displayFeature/genres.slice";

export interface MediaDisplayProps {
    getContent:Media[];
}

const Mediasdisplay = ({getContent}:MediaDisplayProps) => {
    const [loading, setLoading] = useState(true);
    const [medias, setMedias] = useState<Media[]>([]);
    const isAsc = useAppSelector((state) => state.vote.value);
    const dispatch = useAppDispatch();


    const usePathname = () => {
        const location = useLocation();
        return location.pathname;
    }
    const pathname = usePathname();

    const dispatchGenres = async () => {
        if (pathname === "/") {
            dispatch(getGenres([]));
        } else if (pathname === "/films") {
            dispatch(getGenres(await getAllMoviesGenres()));
        } else if (pathname === "/series") {
            dispatch(getGenres(await getAllSeriesGenres()));
        }
    }
    dispatchGenres();

    const fetchData = async () => {
        setMedias(getContent);
        if (medias.length > 0) {
            setLoading(false);
        }
    }

    useEffect(()=> {
        fetchData().catch(console.error);
    }, [fetchData]);

    return (
        <ul className="movies-ul">
            {loading ? (
                <LoadingComponent />
            ) : !isEmpty(medias) ? (
                medias.sort((a, b) => (isAsc ? b.vote_average - a.vote_average : a.vote_average - b.vote_average))
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
