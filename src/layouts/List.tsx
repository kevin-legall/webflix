import React from 'react';
import Navbar from "../components/Navbar";
import Mediasdisplay from "../components/Mediasdisplay";

interface HomeProps {
    isAsc?: boolean,
    searchText?:string,
    idGenres?:number[],
}

const List = ({ isAsc, searchText, idGenres }: HomeProps) => {
    return (
        <main>
            <h1>Ma liste</h1>
            <Mediasdisplay idGenres={idGenres} isAsc={isAsc} searchText={searchText} />
        </main>
    );
};

export default List;