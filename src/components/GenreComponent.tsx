import React from 'react';
import {Genre} from "../models/Genre";

interface Props {
    genre: Genre;
}

const GenreComponent = ({genre}: Props) => {
    return (
        <li>
            <p>coucou</p>
            <p>Id :{genre.id}, nom : {genre.name}</p>
        </li>
    );
};

export default GenreComponent;
