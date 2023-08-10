import React from 'react';
import { Movie } from "../models/Movie";
import { Genre } from "../models/Genre";
import GenreComponent from "./GenreComponent";

interface Props {
    movie: Movie,
}

const MovieComponent: React.FC<Props> = ({ movie }: Props) => {

    return (
        <li className="movie" style={{backgroundImage: `url(${'https://image.tmdb.org/t/p/w300/' + movie.poster_path})`, backgroundPosition: "cover", backgroundRepeat: "no-repeat"}}>
            <div className="fav-container">
                <button className="fav-btn">
                    <i className="fa-regular fa-heart" style={{color: "#ffffff"}}></i>
                </button>
            </div>
            <div className="movie-container">
                <div className="movie-infos">
                    <h3>{movie.title}</h3>
                    <div className="movie-vote"><p>{movie.vote_average}/10 </p><i className="fa-solid fa-star" style={{color: "#fbd201"}} ></i></div>
                </div>
                <ul className="genres-ul">
                    {
                        movie.genres.length > 0 ? (
                            movie.genres.map((genre) => (
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

export default MovieComponent;
