import {motion, Variants} from 'framer-motion';
import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import {Genre} from "../models/Genre";
import {getQuery} from "../features/searchFeature/query.slice";
import {getVote} from "../features/searchFeature/vote.slice";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {getGenresId} from "../features/searchFeature/genresId.slice";

let genresIdData:number[] = [];

export const Navbar = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const menuUl = document.getElementById("menuUl");
    const searchButton = document.getElementById("searchButton");

    window.addEventListener('click', (e)=> {
        const target = e.target as HTMLElement;
        if ((searchButton && searchButton.contains(target)) || (menuUl && menuUl.contains(target))) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    });

    const [genresId, setGenresId] = useState("")
    const [query, setQuery] = useState("");
    const [isAsc, setIsAsc] = useState(true);
    const dispatch = useAppDispatch();
    const genres = useAppSelector((state) => state.genres.value);

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(getQuery(query));
                dispatch(getVote(isAsc));
                dispatch(getGenresId(genresId));
            } catch (error) {
                console.error('Erreur lors de la récupération des genres : ', error);
            }
        };

        fetchData();
    }, [query, isAsc, genresId, genres]);


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
                    <button id="searchButton" onClick={()=> setIsOpen(true)} className="search-button">
                        <i id="searchIcon" className="fa-solid fa-magnifying-glass"></i></button>
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
                    id="menuUl"
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
                        <input type="search" placeholder="Rechercher..." className="search-bar"
                               onChange={(e) => {
                                   setQuery(e.target.value);
                               }}/>
                    </motion.li>
                    <motion.li className="menu-li li-radios" variants={itemVariants}>
                        <p>Trier par notes</p>
                        <div className="radios-container">
                            <input type="radio" id="sortAsc" name="sort" defaultChecked={true} onChange={(e) => {
                                setIsAsc(true);
                            }}></input>
                            <label htmlFor="sortAsc">Croissant</label>

                            <input type="radio" id="sortDesc" name="sort"  onChange={(e) => {
                                setIsAsc(false);
                            }}></input>
                            <label htmlFor="sortDesc">Décroissant</label>
                        </div>
                    </motion.li>
                    <motion.li className="menu-li li-categories" variants={itemVariants}>
                        <ul className="menu-genres">{
                            genres.map((genre: Genre) => (
                                <li className="genre-container" key={genre.id}>
                                    <input type="checkbox" id={"checkbox-" + genre.id} onChange={()=> {
                                        genresIdData.includes(genre.id) ? genresIdData.splice(genresIdData.indexOf(genre.id), 1) : genresIdData.push(genre.id);
                                        setGenresId(genresIdData.join(","));
                                    }} />
                                    <label className="menu-genre" htmlFor={"checkbox-" + genre.id}>{genre.id == 10759 ? "Action et Aventure" : genre.id == 10762 ? "Enfants" : genre.id == 10766 ? "Feuilleton" : genre.id == 10768 ? "Guerre et Politique" :  genre.id == 10763 ? "Actualités" : genre.id == 10764 ? "Divertissement" : genre.id == 10767 ? "Émission de discussion" : genre.name}</label>
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
