import React, {useState} from 'react';
import { Media } from "../models/Media";
import { Genre } from "../models/Genre";
import GenreComponent from "./GenreComponent";
import axios from "axios";

interface Props {
    media: Media,
}

const MediaComponent: React.FC<Props> = ({ media }: Props) => {

    const [isChecked, setIsChecked] = useState<boolean>(false)

    const handleFavorites = (media:Media)=> {
        if (isChecked) {
            axios.post("http://localhost:3000/favoris", {
                media
            });
        } else {
            if (window.confirm("T'es sur que tu veux supprimer l'article mon reuf ?")) {
                axios.delete("http://localhost:3000/favoris/" + media.id);
                window.location.reload();
            }
        }
    }

    return (
        <li className="movie" style={{backgroundImage: `url(${'https://image.tmdb.org/t/p/w300/' + media.poster_path})`, backgroundPosition: "cover", backgroundRepeat: "no-repeat"}}>
            <div className="fav-container">
                <button className="fav-btn" onClick={()=> {
                    setIsChecked(!isChecked)
                    handleFavorites(media)
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
                    <h3>{media.title ? media.title : ""}</h3>
                    <div className="movie-vote"><p>{Math.round(media.vote_average)}/10 </p><i className="fa-solid fa-star" style={{color: "#fbd201"}} ></i></div>
                </div>
                <ul className="genres-ul">
                    {
                        media.genres.length > 0 ? (
                            media.genres.map((genre) => (
                                <GenreComponent key={genre.id} genre={genre} />
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
