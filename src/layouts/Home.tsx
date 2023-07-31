import React from 'react';
import Navbar from "../components/Navbar";
import FetchMovies, {Movie} from "../components/FetchMovies";
import {Genre} from "../components/FetchGenres";

const Home = () => {
    return (
        <main>
            <Navbar />
            <h1>Home</h1>
            <FetchMovies />
        </main>
    );
};

export default Home;