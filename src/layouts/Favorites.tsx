import React from 'react';
import Navbar from "../components/Navbar";
import Mediasdisplay from "../components/Mediasdisplay";

interface HomeProps {
    isAsc?: boolean,
    searchText?:string,
    idGenres?:number[],
}

const Favorites = ({ isAsc, searchText, idGenres }: HomeProps) => {
    return (
        <main>
            <h1>Mes coups de coeurs</h1>
            <Mediasdisplay idGenres={idGenres} isAsc={isAsc} searchText={searchText} />
        </main>
    );
};

export default Favorites;