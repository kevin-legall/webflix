import React, {useEffect, useState} from 'react';
import axios from "axios";
import MovieComponent from "./MovieComponent";
import {Genre} from "./FetchGenres";

export interface Movie {
    id:number;
    original_title:string;
    poster_path:string;
    genres_ids:number;
    overview:string;
    vote_average:number;
    vote_count:number;
}

const FetchMovies = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        // search bar 'https://api.themoviedb.org/3/search/movie?query=flash'
        // sort by average 'https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc'
        axios.get("https://api.themoviedb.org/3/movie/popular", options)
            .then((response) =>  setData(response.data.results))
            .catch(err => console.error(err));
    }, []);

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZWVjZTA4MDU3ZmVhMjRkNzI1ZGMyMTc1ZWZmOGY4NSIsInN1YiI6IjY0YzM2NmRkNDMyNTBmMDBlODA0NWFlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fz8Zd74v5UOGKpBtBIdhelLPKM6ntHVrGQNS1yBU1kk'
        }
    };

    return (
        <div>
            <ul>
                {
                    data.map((movie:Movie)=> (
                        <MovieComponent key={movie.id} movie={movie} />
                    ))
                }
            </ul>
        </div>
    );
};

export default FetchMovies;