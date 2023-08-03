import React from 'react';
import Navbar from "../components/Navbar";
import FetchMovies from "../components/FetchMovies";
import Main from "../components/Main";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <>
            <Navbar />
            <Main />
            <Footer />
        </>
    );
};

export default Home;