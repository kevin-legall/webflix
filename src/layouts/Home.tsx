import React from 'react';
import Navbar from "../components/Navbar";
import FetchMovies from "../components/FetchMovies";

const Home = () => {
    // TODO: faire un composant main qui change le titre en fonction du props
    return (
        <>
            <Navbar />
            <h1>Home</h1>
            <FetchMovies />
        </>
    );
};

export default Home;