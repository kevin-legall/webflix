import React from 'react';
import {Movie} from "./FetchMovies";
import {Genre} from "./FetchGenres";

type Prop = {
    genre: Genre
}
const GenreComponent = ({genre}: Prop) => {
    return (
        <li>
            <h2>{genre.id} : {genre.name}</h2>
        </li>
    );
};

export default GenreComponent;