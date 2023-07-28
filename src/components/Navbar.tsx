import React from 'react';
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <header>
            <div className="search">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type="text" placeholder="search a movie"/>
            </div>
            <nav>
                <ul>
                    <NavLink to={'/'} end className={(nav) => (nav.isActive ? "nav-active" : "")}>
                        <li>Accueil</li>
                    </NavLink>
                    <NavLink to={'/films'} className={(nav) => (nav.isActive ? "nav-active" : "")}>
                        <li>Films</li>
                    </NavLink>
                    <NavLink to={'/series'} className={(nav) => (nav.isActive ? "nav-active" : "")}>
                        <li>Séries</li>
                    </NavLink>
                    <NavLink to={'/mes-coups-de-coeur'} className={(nav) => (nav.isActive ? "nav-active" : "")}>
                        <li>Ma liste</li>
                    </NavLink>
                </ul>
            </nav>
            <div className="profile-container">
                <NavLink to={'/mes-coups-de-coeur'} className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <i className="fa-regular fa-heart"></i>
                </NavLink>
                <div className="profile"><img style={{ height: '50px' }} src={'./images/logo-webflix.png'} alt="logo de Webflix"/></div>
            </div>
        </header>
    );
};

export default Navbar;