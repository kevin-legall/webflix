import React, {useState} from 'react';
import Moviesdisplay from "../components/Moviesdisplay";


interface HomeProps {
    isAsc: boolean,
    searchText:string,
}

const Home = ({ isAsc, searchText }: HomeProps) => {

    return (
        <main>
            <h1>Home</h1>
            <Moviesdisplay isAsc={isAsc} searchText={searchText} />
        </main>
    );
};

export default Home;