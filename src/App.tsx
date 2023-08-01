import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import NotFound from "./layouts/NotFound";
import Home from "./layouts/Home";
import Movies from "./layouts/Movies";
import Series from "./layouts/Series";
import List from "./layouts/List";
import Favorites from "./layouts/Favorites";


const App:React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Home />}></Route>
                <Route path={"/films"} element={<Movies />}></Route>
                <Route path={"/series"} element={<Series />}></Route>
                <Route path={"/ma-liste"} element={<List />}></Route>
                <Route path={"/mes-coups-de-coeur"} element={<Favorites />}></Route>
                <Route path={"*"} element={<NotFound />}></Route>
            </Routes>
        </BrowserRouter>
    )
};

export default App;