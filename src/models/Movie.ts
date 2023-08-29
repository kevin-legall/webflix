import { Genre } from "./Genre";
import { Media } from "./Media";

export class Movie extends Media {

    private _original_title:string;

    constructor(id: number, title: string, poster_path: string, genre_ids: number[], overview: string, vote_average: number, vote_count: number, genres:Genre[]) {
        super(id, title, poster_path, genre_ids, overview, vote_average, vote_count, genres);
        this._original_title = title;
    }

}