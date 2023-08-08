import {motion, Variants} from 'framer-motion';
import React, {useEffect, useRef, useState} from 'react';
import {NavLink} from "react-router-dom";
import {Genre} from "../models/Genre";
import {getAllGenres} from "../api/GenreService";

export interface PropsFilters {
    isAsc: boolean;
    query:string;
}

type QueryChangeCallback = (newQuery: string, newSort: boolean) => void;

interface NavbarProps {
    onSearchChange: QueryChangeCallback;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearchChange }) => {

    const [genres, setGenres] = useState<Genre[]>([]);

    const handleSearchChange = (newQuery: string, newSort: boolean) => {
        onSearchChange(newQuery, newSort);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const genresData: Genre[] = await getAllGenres();
                setGenres(genresData);
            } catch (error) {
                console.error('Erreur lors de la récupération des genres : ', error);
            }
        };

        fetchData();
    }, []);

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const itemVariants: Variants = {
        open: {
            opacity: 1,
            y: 0,
            alignItems: "center",
            transition: {type: "spring", stiffness: 300, damping: 24}
        },
        closed: {opacity: 0, y: 20, transition: {duration: 0.2}}
    };


    return (
        <nav>
            <ul className="nav-ul">
                <li><NavLink to={'/'} end className={(nav) => (nav.isActive ? "nav-active" : "")}>Accueil</NavLink></li>
                <li><NavLink to={'/films'} className={(nav) => (nav.isActive ? "nav-active" : "")}>Films</NavLink></li>
                <li><NavLink to={'/series'} className={(nav) => (nav.isActive ? "nav-active" : "")}>Séries</NavLink>
                </li>
                <li><NavLink to={'/ma-liste'} className={(nav) => (nav.isActive ? "nav-active" : "")}>Ma liste</NavLink>
                </li>
                <li className="li-button">
                    <button onClick={()=> setIsOpen(!isOpen)} className="search-button"><i
                        className="fa-solid fa-magnifying-glass"></i></button>
                </li>
                <li><NavLink to={'/mes-coups-de-coeur'} className={(nav) => (nav.isActive ? "nav-active" : "")}><i
                    className="fa-regular fa-heart"></i></NavLink></li>
            </ul>

            <motion.div
                initial={false}
                animate={isOpen ? "open" : "closed"}
                className={isOpen ? "search-menu open" : "search-menu"}
                variants={{
                    open: {translateY: 10, display: "block"},
                    closed: {translateY: 0, display: "none"}
                }}
                transition={{duration: 0.2}}
                style={{originY: 0.55}}
            >
                <motion.div
                    variants={{
                        open: {rotate: 180},
                        closed: {rotate: 0}
                    }}
                    transition={{duration: 0.2}}
                    style={{originY: 0.55}}
                >
                </motion.div>
                <motion.ul
                    className="menu-ul"
                    variants={{
                        open: {
                            clipPath: "inset(0% 0% 0% 0% round 10px)",
                            transition: {
                                type: "spring",
                                bounce: 0,
                                duration: 0.7,
                                delayChildren: 0.3,
                                staggerChildren: 0.05
                            }
                        },
                        closed: {
                            clipPath: "inset(10% 50% 90% 50% round 10px)",
                            transition: {
                                type: "spring",
                                bounce: 0,
                                duration: 0.3
                            }
                        }
                    }}
                    style={{pointerEvents: isOpen ? "auto" : "none", color: "white"}}
                >
                    <motion.li className="menu-li li-search-bar" variants={itemVariants}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input type="search" placeholder="Rechercher..." className="search-bar" onChange={(e) => handleSearchChange(e.target.value, true)}/>
                    </motion.li>
                    <motion.li className="menu-li li-radios" variants={itemVariants}>
                        <p>Trier par notes</p>
                        <div className="radios-container">
                            <input type="radio" id="sortAsc" name="sort" defaultChecked={true} onChange={() => handleSearchChange("", true)}></input>
                            <label htmlFor="sortAsc">Croissant</label>

                            <input type="radio" id="sortDesc" name="sort" onChange={() => handleSearchChange("", false)}></input>
                            <label htmlFor="sortDesc">Décroissant</label>
                        </div>
                    </motion.li>
                    <motion.li className="menu-li li-categories" variants={itemVariants}>
                        <ul className="menu-genres">{
                            genres.map((genre: Genre) => (
                                <li className="genre-container" key={genre.id}>
                                    <input type="checkbox" id={"checkbox-" + genre.id}/>
                                    <label className="menu-genre" htmlFor={"checkbox-" + genre.id}>{genre.name}</label>
                                </li>
                            ))
                        }</ul>
                    </motion.li>
                </motion.ul>
            </motion.div>
        </nav>
    );
};

export default Navbar;
