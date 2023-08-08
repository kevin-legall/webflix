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


const App:React.FC = () => {

    const [query, setQuery] = useState("");
    const [isAsc, setIsAsc] = useState(true);

    const handleSearchChange = (newQuery:string, newSort:boolean) => {
        setQuery(newQuery);
        setIsAsc(newSort);
    };

    return (
        <BrowserRouter>
            <Navbar onSearchChange={handleSearchChange} />
            <Routes>
                <Route path={"/"} element={<Home query={query} isAsc={isAsc}/>}></Route>
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