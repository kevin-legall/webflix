import {Genre} from "./Genre";

export interface Movie {
    id:number;
    original_title:string;
    poster_path:string;
    genres_ids:number[];
    genres:Genre[];
    overview:string;
    vote_average:number;
    vote_count:number;
}