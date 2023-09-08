import React from 'react';
import {Genre} from "../models/Genre";

interface Props {
    genre: Genre;
}

const GenreComponent = ({genre}: Props) => {
    return (
        <li>
            {genre.id == 10759 ? "Action et Aventure" : genre.id == 10762 ? "Enfants" : genre.id == 10766 ? "Feuilleton" : genre.id == 10768 ? "Guerre et Politique" :  genre.id == 10763 ? "Actualités" : genre.id == 10764 ? "Divertissement" : genre.id == 10767 ? "Émission de discussion" : genre.name}
        </li>
    );
};

export default GenreComponent;
