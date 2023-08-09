import React, {useState} from 'react';
import Moviesdisplay from "../components/Moviesdisplay";


interface HomeProps {
    isAsc: boolean,
    searchText:string,
    idGenres:number[],
}

const Home = ({ isAsc, searchText, idGenres }: HomeProps) => {

    return (
        <main>
            <h1>Home</h1>
            <Moviesdisplay idGenres={idGenres} isAsc={isAsc} searchText={searchText} />
        </main>
    );
};

export default Home;