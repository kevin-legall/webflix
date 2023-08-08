import React, {useState} from 'react';
import Moviesdisplay from "../components/Moviesdisplay";


interface HomeProps {
    query: string,
    isAsc: boolean
}

const Home = ({ query, isAsc }: HomeProps) => {

    return (
        <main>
            <h1>Home</h1>
            <Moviesdisplay query={query} isAsc={isAsc}/>
        </main>
    );
};

export default Home;