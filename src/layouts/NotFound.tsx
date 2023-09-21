import React from 'react';
import {NavLink} from "react-router-dom";

const NotFound = () => {
    return (
        <main>
            <div className="container-404">
                <div className="text-404">
                    <h1>Oups ! Page introuvable</h1>
                    <p>La page que vous recherchez n'existe peut-être pas...</p>
                    <NavLink to={'/'} className="btn-404">Retourner à l'accueil</NavLink>
                </div>
                <div className="image-404">
                </div>
            </div>
        </main>
    );
};

export default NotFound;