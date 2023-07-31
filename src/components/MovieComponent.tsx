import React from 'react';
import {Movie} from "./FetchMovies";

type Prop = {
    movie: Movie
    genres: Genre[];
}
const MovieComponent = ({ movie, genres }: Prop) => {

    const getCategoryById = (categoryId: number): string => {
        const category = genres.find((genre: Genre) => genre.id === categoryId);
        return category ? category.name : 'Catégorie inconnue';
    };

    return (
        <li>
            <img src={"https://image.tmdb.org/t/p/w300/"+movie.poster_path} alt={"image du film " + movie.original_title}/>
            <h3>{movie.original_title}</h3>
            <p>{movie.overview}</p>
            <p>{movie.vote_average}/10 ({movie.vote_count} votes)</p>
            <ul>
                {movie.genres_ids.map((genres_id) => (
                    <li>
                    </li>
                ))};
            </ul>
        </li>
    );
};

export default MovieComponent;