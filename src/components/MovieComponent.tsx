import React from 'react';
import { Movie } from "../models/Movie";
import { Genre } from "../models/Genre";
import GenreComponent from "./GenreComponent";

interface Props {
    movie: Movie,
}

const MovieComponent: React.FC<Props> = ({ movie }: Props) => {

    return (
        <li>
            <img src={"https://image.tmdb.org/t/p/w300/" + movie.poster_path} alt={"image du film " + movie.original_title} />
            <h3>{movie.original_title}</h3>
            <p>{movie.overview}</p>
            <p>{movie.vote_average}/10 ({movie.vote_count} votes)</p>
            <ul>Catégories :
                {
                    movie.genres.length > 0 ? (
                        movie.genres.map((genre) => (
                            <GenreComponent key={genre.id} genre={genre} />
                        ))
                    ) : (
                        <li>Ce film ne possède pas de catégorie.</li>
                    )
                }
            </ul>
        </li>
    );
};

export default MovieComponent;
