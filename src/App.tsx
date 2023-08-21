import React, {useState} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import NotFound from "./layouts/NotFound";
import Home from "./layouts/Home";
import Movies from "./layouts/Movies";
import Series from "./layouts/Series";
import List from "./layouts/List";
import Favorites from "./layouts/Favorites";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {useSelector} from "react-redux";

const App:React.FC = () => {

    const movies = useSelector((state)=> state.movieReducer);

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path={"/"} element={<Home />}></Route>
                <Route path={"/films"} element={<Movies />}></Route>
                <Route path={"/series"} element={<Series />}></Route>
                <Route path={"/ma-liste"} element={<List />}></Route>
                <Route path={"/mes-coups-de-coeur"} element={<Favorites />}></Route>
                <Route path={"*"} element={<NotFound />}></Route>
            </Routes>
            <Footer />
        </BrowserRouter>
    )
};

export default App;