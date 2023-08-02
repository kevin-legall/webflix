import {Genre} from "./Genre";

export interface Movie {
    id:number;
    original_title:string;
    poster_path:string;
    genre_ids:number[];
    overview:string;
    vote_average:number;
    vote_count:number;
}