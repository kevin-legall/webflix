import React, {useEffect, useState} from 'react';
import {Media} from "../models/Media";
import axios from "axios";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {addFavorite, removeFavorite} from "../features/favoritesFeature/favorites.slice";

interface FavButtonProps {
    media:Media
}

const FavButton = ({media}: FavButtonProps) => {
    const [isFavorite, setIsFavorite] = useState<boolean>(false)
    const dispatch = useAppDispatch();

    useEffect(()=> {

    }, []);

    const data = {
        mediaType: media.media_type,
        title: media.title,
        posterPath: media.poster_path,
        genreIds: media.genre_ids,
        overview: media.overview,
        voteAverage: media.vote_average,
        voteCount: media.vote_count,
        favoris: '/api/favoris/1',
    };

    const handleFavorites = async () => {
        try {
            if (isFavorite) {
                console.log(data);
                setIsFavorite(false);
                await axios.delete(`http://localhost:8000/api/media/${media.id}`);
                dispatch(removeFavorite(data));
            } else {
                console.log(data);
                setIsFavorite(true);
                await axios.post('http://localhost:8000/api/media', data);
                dispatch(addFavorite(data));
            }
        } catch (error) {
            console.error(`Erreur : ${error}`);
        }
    };

    return (
        <button className="fav-btn" onClick={handleFavorites}>
            {isFavorite ? (
                <i className="fa-solid fa-heart" style={{ color: "#ff3d51" }}></i>
            ) : (
                <i className="fa-regular fa-heart" style={{ color: "#ffffff" }}></i>
            )}
        </button>
    );
};

export default FavButton;