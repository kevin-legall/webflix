import React from 'react';
import { Movie } from "../models/Movie";
import GenreComponent from "./GenreComponent";

type Props = {
    movie: Movie;
}
const MovieComponent = ({ movie }: Props) => {

    return (
        <li>
            <img src={"https://image.tmdb.org/t/p/w300/"+movie.poster_path} alt={"image du film " + movie.original_title}/>
            <h3>{movie.original_title}</h3>
            <p>{movie.overview}</p>
            <p>{movie.vote_average}/10 ({movie.vote_count} votes)</p>
            <ul>Catégories :
                <div>{
                    movie.genres?.map((genre)=> {
                        return <GenreComponent key={genre.id} genre={genre} />
                    }) ?? "Ce film ne possède pas de catégorie. Connard."
                }</div>
            </ul>
        </li>
    );
};

export default MovieComponent;