import React, {useEffect, useState} from 'react';
import axios from "axios";
import GenreComponent from "./GenreComponent";

export interface Genre {
    id:number;
    name:string;
}

const FetchGenres = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("https://api.themoviedb.org/3/genre/movie/list", options)
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
        <ul>
            {
                data.map((genre:Genre)=> (
                    <GenreComponent key={genre.id} genre={genre}/>
                ))
            }
        </ul>
    );
};

export default FetchGenres;