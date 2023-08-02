import {motion, Variants} from 'framer-motion';
import React, {useState} from 'react';
import {NavLink} from "react-router-dom";

const Navbar = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const itemVariants: Variants = {
        open: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 300, damping: 24 }
        },
        closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
    };


    return (
        <nav>
            <ul>
                <li><NavLink to={'/'} end className={(nav) => (nav.isActive ? "nav-active" : "")}>Accueil</NavLink></li>
                <li><NavLink to={'/films'} className={(nav) => (nav.isActive ? "nav-active" : "")}>Films</NavLink></li>
                <li><NavLink to={'/series'} className={(nav) => (nav.isActive ? "nav-active" : "")}>Séries</NavLink></li>
                <li><NavLink to={'/ma-liste'} className={(nav) => (nav.isActive ? "nav-active" : "")}>Ma liste</NavLink></li>
                <li className="li-button"><button onClick={()=> setIsOpen(!isOpen)} className="search-button"><i className="fa-solid fa-magnifying-glass"></i></button></li>
                <li><NavLink to={'/mes-coups-de-coeur'} className={(nav) => (nav.isActive ? "nav-active" : "")}><i className="fa-regular fa-heart"></i></NavLink></li>
            </ul>
            <motion.nav
                initial={false}
                animate={isOpen ? "open" : "closed"}
                className="menu"
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
                    <motion.li variants={itemVariants}>Item 1 </motion.li>
                    <motion.li variants={itemVariants}>Item 2 </motion.li>
                    <motion.li variants={itemVariants}>Item 3 </motion.li>
                    <motion.li variants={itemVariants}>Item 4 </motion.li>
                    <motion.li variants={itemVariants}>Item 5 </motion.li>
                </motion.ul>
            </motion.nav>
        </nav>
    );
};

export default Navbar;