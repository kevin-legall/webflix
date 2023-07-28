import React from 'react';
import Navbar from "../components/Navbar";
import FetchMovies from "../components/FetchMovies";

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