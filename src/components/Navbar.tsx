import {motion, Variants} from 'framer-motion';
import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import GenreComponent from "./GenreComponent";
import MovieComponent from "./MovieComponent";

const Navbar = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const itemVariants: Variants = {
        open: {
            opacity: 1,
            y: 0,
            alignItems: "center",
            transition: { type: "spring", stiffness: 300, damping: 24 }
        },
        closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
    };


    return (
        <nav>
            <ul className="nav-ul">
                <li><NavLink to={'/'} end className={(nav) => (nav.isActive ? "nav-active" : "")}>Accueil</NavLink></li>
                <li><NavLink to={'/films'} className={(nav) => (nav.isActive ? "nav-active" : "")}>Films</NavLink></li>
                <li><NavLink to={'/series'} className={(nav) => (nav.isActive ? "nav-active" : "")}>Séries</NavLink></li>
                <li><NavLink to={'/ma-liste'} className={(nav) => (nav.isActive ? "nav-active" : "")}>Ma liste</NavLink></li>
                <li className="li-button"><button onClick={()=> setIsOpen(!isOpen)} className="search-button"><i className="fa-solid fa-magnifying-glass"></i></button></li>
                <li><NavLink to={'/mes-coups-de-coeur'} className={(nav) => (nav.isActive ? "nav-active" : "")}><i className="fa-regular fa-heart"></i></NavLink></li>
            </ul>
            <motion.div
                initial={false}
                animate={isOpen ? "open" : "closed"}
                className={isOpen ? "search-menu open" : "search-menu"}
                variants={{
                    open: { translateY: 10, display: "block" },
                    closed: { translateY: 0, display: "none" }
                }}
                transition={{ duration: 0.2 }}
                style={{ originY: 0.55 }}
            >
                    <motion.div
                        variants={{
                            open: { rotate: 180 },
                            closed: { rotate: 0 }
                        }}
                        transition={{ duration: 0.2 }}
                        style={{ originY: 0.55 }}
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
                    style={{ pointerEvents: isOpen ? "auto" : "none", color: "white" }}
                >
                    <motion.li className="menu-li li-search-bar" variants={itemVariants}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input type="search" placeholder="Rechercher..." className="search-bar"/>
                    </motion.li>
                    <motion.li className="menu-li li-radios" variants={itemVariants}>
                        <p>Trier par notes</p>
                        <div className="radios-container">
                            <input type="radio" id="sortAsc" name="sort" checked></input>
                            <label htmlFor="sortAsc">asc</label>

                            <input type="radio" id="sortDesc" name="sort"></input>
                            <label htmlFor="sortDesc">desc</label>
                        </div>
                    </motion.li>
                    <motion.li className="menu-li li-categories" variants={itemVariants}>
                        {

                        }
                    </motion.li>
                </motion.ul>
            </motion.div>
        </nav>
    );
};

export default Navbar;