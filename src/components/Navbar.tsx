import React, {useState} from 'react';
import {NavLink} from "react-router-dom";

const Navbar = () => {

    const [isShowed, setIsShowed] = useState(false);

    return (
        <nav>
            <ul>
                <li>
                    <NavLink to={'/'} end className={(nav) => (nav.isActive ? "nav-active" : "")}>Accueil</NavLink>
                </li>
                <li>
                    <NavLink to={'/films'} className={(nav) => (nav.isActive ? "nav-active" : "")}>Films</NavLink>
                </li>
                <li>
                    <NavLink to={'/series'} className={(nav) => (nav.isActive ? "nav-active" : "")}>Séries</NavLink>
                </li>
                <li>
                    <NavLink to={'/ma-liste'} className={(nav) => (nav.isActive ? "nav-active" : "")}>Ma liste</NavLink>
                </li>
                <li>
                    <button onClick={()=> setIsShowed(!isShowed)} className={(isShowed ? "search-button active" : "search-button")}><i className="fa-solid fa-magnifying-glass"></i></button>
                </li>
                <li>
                    <NavLink to={'/mes-coups-de-coeur'} className={(nav) => (nav.isActive ? "nav-active" : "")}><i className="fa-regular fa-heart"></i></NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;