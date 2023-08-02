import React from 'react';
import Navbar from "../components/Navbar";
import FetchMovies from "../components/FetchMovies";
import Main from "../components/Main";
import Footer from "../components/Footer";

const Home = () => {
    // TODO: faire un composant main qui change le titre en fonction du props
    return (
        <>
            <Navbar />
            <Main />
            <Footer />
        </>
    );
};

export default Home;