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
import {getAllMovies, getPopularMovies} from "./api/MediaService";
import {Media} from "./models/Media";

const App:React.FC = () => {

    const [isAsc, setIsAsc] = useState<boolean | undefined>(true);
    const [searchText, setSearchText] = useState<string | undefined>("")
    const [idGenres, setIdGenres] = useState<number[] | undefined>([])

    const handleSearchChange = (newSort?:boolean, searchText?:string, idGenres?:number[]) => {
        setIsAsc(newSort);
        setSearchText(searchText);
        setIdGenres(idGenres);
    };

    return (
        <BrowserRouter>
            <Navbar onSearchChange={handleSearchChange} />
            <Routes>
                <Route path={"/"} element={<Home idGenres={idGenres} searchText={searchText} isAsc={isAsc} />}></Route>
                <Route path={"/films"} element={<Movies idGenres={idGenres} searchText={searchText} isAsc={isAsc} />}></Route>
                <Route path={"/series"} element={<Series idGenres={idGenres} searchText={searchText} isAsc={isAsc} />}></Route>
                <Route path={"/ma-liste"} element={<List idGenres={idGenres} searchText={searchText} isAsc={isAsc} />}></Route>
                <Route path={"/mes-coups-de-coeur"} element={<Favorites idGenres={idGenres} searchText={searchText} isAsc={isAsc} />}></Route>
                <Route path={"*"} element={<NotFound />}></Route>
            </Routes>
            <Footer />
        </BrowserRouter>
    )
};

export default App;