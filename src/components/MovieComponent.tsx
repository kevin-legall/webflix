import React from 'react';
import {Movie} from "./FetchMovies";
import FetchGenres, {Genre} from "./FetchGenres";

type Prop = {
    movie: Movie
}
const MovieComponent = ({movie}: Prop) => {

    return (
        <li>
            <img src={"https://image.tmdb.org/t/p/w300/"+movie.poster_path} alt={"image du film " + movie.original_title}/>
            <h3>{movie.original_title}</h3>
            <p>{movie.overview}</p>
            <p>{movie.vote_average}/10 ({movie.vote_count} votes)</p>
            <p>{movie.genres_ids}</p>
        </li>
    );
};

export default MovieComponent;