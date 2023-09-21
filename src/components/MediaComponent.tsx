import React from 'react';
import { Media } from "../models/Media";
import GenreComponent from "./GenreComponent";
import FavButton from "./FavButton";

interface Props {
    media: Media,
}

const MediaComponent: React.FC<Props> = ({ media }: Props) => {

    return (
        <li className="movie" style={{backgroundImage: `url(${media.poster_path ? 'https://image.tmdb.org/t/p/w300/' + media.poster_path : '' })`, backgroundPosition: "cover", backgroundRepeat: "no-repeat"}}>
            <div className="fav-container">
                <FavButton media={media}/>
            </div>
            <div className="movie-container">
                <div className="movie-infos">
                    <h3>{media.title}</h3>
                    <div className="movie-vote"><p>{media.vote_average.toFixed(1)}/10 </p><i className="fa-solid fa-star" style={{color: "#fbd201"}} ></i></div>
                </div>
                <ul className="genres-ul">
                    {
                        media.genres.length > 0 ? (
                        media.genres.map((genre) => (
                            <GenreComponent key={`${genre.id}-${media.id}`} genre={genre} />
                        ))
                        ) : (
                            <li>Pas de catégorie</li>
                        )
                    }
                </ul>
            </div>

        </li>
    );
};

export default MediaComponent;
