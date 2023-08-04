import React, { useEffect, useState } from 'react';
import MovieComponent from "./MovieComponent";
import { Movie } from "../models/Movie";
import { Genre } from "../models/Genre";
import {getAllMovies} from "../api/MovieService";
import LoadingComponent from "./LoadingComponent";
import movies from "../layouts/Movies";

interface Props {
    genres:Genre[]
}

const FetchMovies: React.FC = () => {


    const [categoriesById, setCategoriesById] = useState<{ [key: number]: Genre }>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getAllMovies().then((data)=> {
                   return ;
                })


            } catch (error) {
                console.error('Erreur lors de la récupération des données : ', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {
                movies.length > 0 ?
                    <ul>
                        {
                            movies.map((movie: Movie) => (
                                <MovieComponent key={movie.id} movie={movie} categoriesById={categoriesById}/>
                            ))
                        }
                    </ul>
                : <LoadingComponent />
            }

        </div>
    );
};

export default FetchMovies;
