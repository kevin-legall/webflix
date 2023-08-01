import React from 'react';
import Navbar from "../components/Navbar";
import FetchMovies, {Movie} from "../components/FetchMovies";
import {Genre} from "../components/FetchGenres";

const Home = () => {



    return (
        <React.Fragment>
            <Navbar />
            <h1>Home</h1>
            <FetchMovies />
        </React.Fragment>
    );
};

export default Home;