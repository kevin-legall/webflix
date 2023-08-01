import React from 'react';
import Navbar from "../components/Navbar";
import FetchMovies from "../components/FetchMovies";
import GenreComponent from "../components/GenreComponent";

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