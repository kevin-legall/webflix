import React, {useEffect, useState} from 'react';
import {Media} from "../models/Media";
// import colors from "../assets/styles/_settings.scss"
//TODO : installer Webpack pour faire marcher les allias de chemin de fichier

interface FavButtonProps {
    media:Media
}

const FavButton = ({media}: FavButtonProps) => {
    const [isChecked, setIsChecked] = useState<boolean>(false)
    const [color, setColor] = useState();

    // useEffect(()=> {
    //     if (isChecked) {
    //         setColor(colors.red1);
    //     } else {
    //         setColor(colors.red1);
    //     }
    // }, []);

    const handleFavorites = ()=> {
        setIsChecked(!isChecked);
        if (!localStorage.getItem(String(media.id))) {
            localStorage.setItem(String(media.id), JSON.stringify(media));
        } else {
            console.log('Ce média est déja dans tes favoris');
        }
    }

    return (
        <button className="fav-btn" onClick={handleFavorites}>
            {localStorage.getItem(String(media.id)) === media.id.toString() ? (
                <i className="fa-solid fa-heart" style={{ color: "#ff3d51" }}></i>
            ) : (
                <i className="fa-regular fa-heart" style={{ color: "#ffffff" }}></i>
            )}
        </button>
    );
};

export default FavButton;