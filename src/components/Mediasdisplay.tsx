import React, { useEffect, useState } from 'react';
import MediaComponent from "./MediaComponent";
import { Media } from "../models/Media";
import {getAllMovies, getPopularMovies} from "../api/MediaService";
import LoadingComponent from "./LoadingComponent";
import HomeProps from "../layouts/Home";

interface MediasdisplayProps {
    isAsc?: boolean,
    searchText?: string,
    idGenres?: number[],
    getContent:Promise<Media[]>
}

//TODO : Refacto scss movie -> media

const Mediasdisplay = ({ isAsc, searchText, idGenres, getContent}: MediasdisplayProps) => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        setTimeout(async () => {
            getContent
        }, 2000);

    }, []);

    const sortedMedias:Media[] = medias.filter((media:Media) =>
        media.title.toLowerCase().includes(searchText ? searchText.toLowerCase() : "")
    );

    const filteredMedias = sortedMedias.filter((media) =>
        media.genre_ids.some(id => idGenres)
    );

    return (
            <ul className="movies-ul">
                {loading ? (
                    <LoadingComponent/>
                ) : filteredMedias.length > 0 ? (
                    filteredMedias.sort((a, b) => (isAsc ? b.vote_average - a.vote_average : a.vote_average - b.vote_average))
                        .map((movie: Media) => (
                            <MediaComponent key={movie.id}  media={media}/>
                        ))
                ) : (
                    <h1>Aucun film trouvé :(</h1>
                )}
            </ul>
    );
};

export default Mediasdisplay;
