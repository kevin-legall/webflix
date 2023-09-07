import React, {useState} from 'react';
import { Media } from "../models/Media";
import { Genre } from "../models/Genre";
import GenreComponent from "./GenreComponent";
import axios from "axios";
import {Serie} from "../models/Serie";
import {Movie} from "../models/Movie";

interface Props {
    media: Media,
}

const MediaComponent: React.FC<Props> = ({ media }: Props) => {

    const [isChecked, setIsChecked] = useState<boolean>(false)

    return (
        <li className="movie" style={{backgroundImage: `url(${media.poster_path ? 'https://image.tmdb.org/t/p/w300/' + media.poster_path : './images/image_empty.jpg' })`, backgroundPosition: "cover", backgroundRepeat: "no-repeat"}}>
            <div className="fav-container">
                <button className="fav-btn" onClick={()=> {
                    setIsChecked(!isChecked)
                }}>
                    {
                        isChecked ? (
                            <i className="fa-solid fa-heart" style={{color: "#ff3d51"}}></i>
                        ) : <i className="fa-regular fa-heart" style={{color: "#ffffff"}}></i>
                    }
                </button>
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
