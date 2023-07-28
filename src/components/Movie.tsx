import React from 'react';
import {Movie} from "./FetchMovies";

type Prop = {
    movie: Movie
}
const MovieComponent = ({movie}: Prop) => {
    return (
        <li>
            <h2>{movie.original_title}</h2>
        </li>
    );
};

export default MovieComponent;