import { Genre } from "./Genre";
import { Media } from "./Media";

export class Movie extends Media {

    constructor(id: number, original_title: string, poster_path: string, genre_ids: number[], overview: string, vote_average: number, vote_count: number, genres:Genre[]) {
        super(id, original_title, poster_path, genre_ids, overview, vote_average, vote_count, genres);
    }

}